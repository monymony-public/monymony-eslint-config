type NodeLike = {
  type: string
  [key: string]: any
}

type DecoratorLike = {
  expression: NodeLike
}

type ParameterLike = NodeLike & {
  decorators?: DecoratorLike[]
  typeAnnotation?: {
    typeAnnotation?: NodeLike
  }
}

type MethodLike = NodeLike & {
  decorators?: DecoratorLike[]
  key?: NodeLike
  parent?: NodeLike
  kind?: string
  accessibility?: string
  static?: boolean
  value?: {
    params?: ParameterLike[]
  }
}

type ClassLike = NodeLike & {
  id?: {
    name?: string
  }
  decorators?: DecoratorLike[]
}

type RuleContextLike = {
  options: Array<Record<string, unknown>>
  report: (descriptor: {
    node: NodeLike
    messageId: string
    data?: Record<string, string>
  }) => void
}

const DEFAULT_GRAPHQL_ALLOWED_ARGUMENT_TYPES = [
  'ConnectionWhereArguments',
  'OffsetPageableArguments',
  'LocaleArguments',
]

const TARGET_CLASS_NAME_PATTERN = /(?:ServiceImpl|UseCase|Gateway|Repository)$/

const GRAPHQL_OPERATION_DECORATORS = new Set(['Query', 'Mutation'])

const RELAY_ARG_NAMES = new Set(['after', 'before', 'first', 'last'])

function getDecoratorCallName(decorator: DecoratorLike | undefined): string | null {
  if (!decorator) {
    return null
  }

  const expression = decorator.expression

  if (expression.type === 'CallExpression') {
    return getExpressionName(expression.callee as NodeLike)
  }

  return getExpressionName(expression)
}

function getExpressionName(node: NodeLike | undefined): string | null {
  if (!node) {
    return null
  }

  if (node.type === 'Identifier') {
    return typeof node.name === 'string' ? node.name : null
  }

  if (node.type === 'MemberExpression') {
    const property = node.property as NodeLike | undefined

    if (property?.type === 'Identifier' && typeof property.name === 'string') {
      return property.name
    }
  }

  return null
}

function getDecoratorArgumentValue(
  decorator: DecoratorLike | undefined,
  index: number,
): string | null {
  if (!decorator) {
    return null
  }

  const expression = decorator.expression

  if (expression.type !== 'CallExpression') {
    return null
  }

  const argument = (expression.arguments as NodeLike[] | undefined)?.[index]

  if (!argument) {
    return null
  }

  if (argument.type === 'Literal' && typeof argument.value === 'string') {
    return argument.value
  }

  const expressions = argument.expressions as NodeLike[] | undefined

  if (argument.type === 'TemplateLiteral' && expressions?.length === 0) {
    return ((argument.quasis as Array<{value?: {cooked?: string}}> | undefined)?.[0]?.value?.cooked ??
      null)
  }

  return null
}

function getClassName(node: ClassLike | undefined): string | null {
  return node?.id?.name ?? null
}

function getMethodName(node: MethodLike): string | null {
  const key = node.key

  if (!key) {
    return null
  }

  if (key.type === 'Identifier' && typeof key.name === 'string') {
    return key.name
  }

  if (key.type === 'Literal' && typeof key.value === 'string') {
    return key.value
  }

  return null
}

function getMethodParameters(node: MethodLike): ParameterLike[] {
  const parameters = node.value?.params ?? node.params

  return Array.isArray(parameters) ? parameters : []
}

function hasDecorator(node: {decorators?: DecoratorLike[]}, decoratorName: string): boolean {
  return (
    node.decorators?.some(decorator => getDecoratorCallName(decorator) === decoratorName) ?? false
  )
}

function getEnclosingClass(node: NodeLike | undefined): ClassLike | null {
  let current = node?.parent as NodeLike | undefined

  while (current) {
    if (
      current.type === 'ClassDeclaration' ||
      current.type === 'ClassExpression' ||
      current.type === 'TSAbstractClassDeclaration'
    ) {
      return current as ClassLike
    }

    current = current.parent as NodeLike | undefined
  }

  return null
}

function isGraphqlOperationMethod(node: MethodLike): boolean {
  return (
    node.decorators?.some(decorator => {
      const decoratorName = getDecoratorCallName(decorator)

      return decoratorName ? GRAPHQL_OPERATION_DECORATORS.has(decoratorName) : false
    }) ?? false
  )
}

function getArgsDecorator(parameter: ParameterLike): DecoratorLike | undefined {
  return parameter.decorators?.find(decorator => getDecoratorCallName(decorator) === 'Args')
}

function getTypeReferenceName(typeNode: NodeLike | undefined): string | null {
  if (!typeNode) {
    return null
  }

  if (typeNode.type === 'TSTypeReference') {
    return getExpressionName(typeNode.typeName as NodeLike)
  }

  return null
}

function isAllowedArgumentType(typeName: string | null, allowTypeNames: string[]): boolean {
  return typeName ? allowTypeNames.includes(typeName) : false
}

function isObjectLikeArgumentType(typeName: string | null): boolean {
  return typeName
    ? /(Input|Args|Arguments|WhereArgs|WhereArguments|PageableArguments)$/.test(typeName)
    : false
}

function getRuleOptionStringArray(
  options: Array<Record<string, unknown>>,
  key: string,
  fallback: string[],
): string[] {
  const value = options[0]?.[key]

  if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
    return fallback
  }

  return value as string[]
}

const resolveFieldInResolverClassRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require @ResolveField() to be declared only inside @Resolver() classes',
    },
    schema: [],
    messages: {
      resolverOnly:
        '@ResolveField() should be declared in a @Resolver() class, not in {{className}}.',
    },
  },
  create(context: RuleContextLike) {
    return {
      MethodDefinition(node: MethodLike) {
        if (!hasDecorator(node, 'ResolveField')) {
          return
        }

        const enclosingClass = getEnclosingClass(node)

        if (!enclosingClass || hasDecorator(enclosingClass, 'Resolver')) {
          return
        }

        context.report({
          node,
          messageId: 'resolverOnly',
          data: {
            className: getClassName(enclosingClass) ?? 'this class',
          },
        })
      },
    }
  },
}

const graphqlRequireInputArgsNameRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        "Prefer @Args('input') input: XxxInput for GraphQL business arguments in Query/Mutation resolvers",
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowTypeNames: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      requireInput:
        "Use @Args('input') input: {{typeName}} for GraphQL business arguments instead of bare @Args().",
      requireInputName:
        "Use @Args('input') input: {{typeName}} for GraphQL business arguments instead of @Args('{{argumentName}}').",
    },
  },
  create(context: RuleContextLike) {
    const allowTypeNames = getRuleOptionStringArray(
      context.options,
      'allowTypeNames',
      DEFAULT_GRAPHQL_ALLOWED_ARGUMENT_TYPES,
    )

    return {
      MethodDefinition(node: MethodLike) {
        if (!isGraphqlOperationMethod(node)) {
          return
        }

        for (const parameter of getMethodParameters(node)) {
          const argsDecorator = getArgsDecorator(parameter)

          if (!argsDecorator) {
            continue
          }

          const typeName = getTypeReferenceName(parameter.typeAnnotation?.typeAnnotation as NodeLike)

          if (!isObjectLikeArgumentType(typeName) || isAllowedArgumentType(typeName, allowTypeNames)) {
            continue
          }

          const argumentName = getDecoratorArgumentValue(argsDecorator, 0)

          if (argumentName === 'input' || (argumentName && RELAY_ARG_NAMES.has(argumentName))) {
            continue
          }

          if (argumentName) {
            context.report({
              node: parameter,
              messageId: 'requireInputName',
              data: {
                argumentName,
                typeName: typeName ?? 'the argument type',
              },
            })

            continue
          }

          context.report({
            node: parameter,
            messageId: 'requireInput',
            data: {
              typeName: typeName ?? 'the argument type',
            },
          })
        }
      },
    }
  },
}

const preferInputObjectParameterRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer a single input object parameter for public methods in ServiceImpl/UseCase/Gateway/Repository classes',
    },
    schema: [
      {
        type: 'object',
        properties: {
          classNamePattern: {
            type: 'string',
          },
          minParamCount: {
            type: 'number',
            minimum: 2,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      preferInputObject:
        'Prefer a single `input` object parameter instead of {{paramCount}} positional parameters in {{className}}.{{methodName}}().',
    },
  },
  create(context: RuleContextLike) {
    const classNamePatternValue = context.options[0]?.classNamePattern
    const classNamePattern =
      typeof classNamePatternValue === 'string'
        ? new RegExp(classNamePatternValue)
        : TARGET_CLASS_NAME_PATTERN
    const minParamCountValue = context.options[0]?.minParamCount
    const minParamCount =
      typeof minParamCountValue === 'number' ? minParamCountValue : 2

    return {
      MethodDefinition(node: MethodLike) {
        if (node.kind === 'constructor' || node.accessibility === 'private' || node.static) {
          return
        }

        const enclosingClass = getEnclosingClass(node)
        const className = getClassName(enclosingClass)

        if (!className || !classNamePattern.test(className)) {
          return
        }

        const parameters = getMethodParameters(node).filter(
          parameter => parameter.type !== 'TSParameterProperty',
        )

        if (parameters.length < minParamCount) {
          return
        }

        context.report({
          node,
          messageId: 'preferInputObject',
          data: {
            className,
            methodName: getMethodName(node) ?? 'anonymous',
            paramCount: String(parameters.length),
          },
        })
      },
    }
  },
}

export const monymonyPlugin = {
  meta: {
    name: '@monymony/eslint-config/internal',
  },
  rules: {
    'resolve-field-in-resolver-class': resolveFieldInResolverClassRule,
    'graphql-require-input-args-name': graphqlRequireInputArgsNameRule,
    'prefer-input-object-parameter': preferInputObjectParameterRule,
  },
}
