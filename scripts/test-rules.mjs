import { RuleTester } from 'eslint'
import tseslint from 'typescript-eslint'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)
const { monymonyPlugin } = jiti('../monymony-plugin.ts')

RuleTester.setDefaultConfig({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
})

const tester = new RuleTester()

tester.run(
  'resolve-field-in-resolver-class',
  monymonyPlugin.rules['resolve-field-in-resolver-class'],
  {
    valid: [
      `
      @Resolver(() => UserNode)
      class UserNodeResolver {
        @ResolveField(() => String)
        name() {
          return 'ok'
        }
      }
      `,
    ],
    invalid: [
      {
        code: `
        @ObjectType()
        class UserNode {
          @ResolveField(() => String)
          name() {
            return 'bad'
          }
        }
        `,
        errors: [{ messageId: 'resolverOnly' }],
      },
    ],
  },
)

tester.run(
  'graphql-require-input-args-name',
  monymonyPlugin.rules['graphql-require-input-args-name'],
  {
    valid: [
      `
      class UpdateUserInput {}

      @Resolver()
      class UserResolver {
        @Mutation(() => Boolean)
        updateUser(@Args('input') input: UpdateUserInput) {
          return true
        }
      }
      `,
      `
      class ConnectionWhereArguments {}

      @Resolver()
      class UserResolver {
        @Query(() => Boolean)
        users(@Args() args: ConnectionWhereArguments) {
          return true
        }
      }
      `,
      `
      @Resolver()
      class UserResolver {
        @Query(() => Boolean)
        users(@Args('after') after?: string, @Args('first') first?: number) {
          return true
        }
      }
      `,
    ],
    invalid: [
      {
        code: `
        class DeleteUserArguments {}

        @Resolver()
        class UserResolver {
          @Mutation(() => Boolean)
          deleteUser(@Args() args: DeleteUserArguments) {
            return true
          }
        }
        `,
        errors: [{ messageId: 'requireInput' }],
      },
      {
        code: `
        class UpdateUserInput {}

        @Resolver()
        class UserResolver {
          @Mutation(() => Boolean)
          updateUser(@Args('payload') input: UpdateUserInput) {
            return true
          }
        }
        `,
        errors: [{ messageId: 'requireInputName' }],
      },
    ],
  },
)

tester.run(
  'prefer-input-object-parameter',
  monymonyPlugin.rules['prefer-input-object-parameter'],
  {
    valid: [
      `
      class CoupleUseCase {
        async update(input: { objectId: string; nickname?: string }) {
          return input
        }
      }
      `,
      `
      class ConfigService {
        get(name: string, fallback?: string) {
          return fallback
        }
      }
      `,
    ],
    invalid: [
      {
        code: `
        class CoupleUseCase {
          async update(objectId: string, nickname?: string) {
            return nickname
          }
        }
        `,
        errors: [{ messageId: 'preferInputObject' }],
      },
      {
        code: `
        class CoupleServiceImpl {
          async update(userObjectId: string, coupleObjectId: string, premiumDeadline?: Date) {
            return premiumDeadline
          }
        }
        `,
        errors: [{ messageId: 'preferInputObject' }],
      },
    ],
  },
)

console.log('rule tests passed')
