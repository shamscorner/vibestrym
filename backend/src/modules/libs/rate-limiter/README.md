# Description

`nestjs-rate-limiter` is a module which adds in configurable rate limiting for [Nest](https://github.com/nestjs/nest) applications.

Under the hood it uses [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible).

# Installation

```bash
npm i --save nestjs-rate-limiter
```

Or if you use Yarn:

```bash
yarn add nestjs-rate-limiter
```

# Requirements

`nestjs-rate-limiter` is built to work with Nest 6 and newer versions.

# Basic Usage

### Include Module

First you need to import this module into your main application module:

> app.module.ts

```ts
import { RateLimiterModule } from 'nestjs-rate-limiter'

@Module({
	imports: [RateLimiterModule]
})
export class ApplicationModule {}
```

### Using Guard

Now you need to register the guard. You can do this only on some routes:

> app.controller.ts

```ts
import { RateLimiterGuard } from 'nestjs-rate-limiter'

@UseGuards(RateLimiterGuard)
@Get('/login')
public async login() {
    console.log('hello')
}
```

Or you can choose to register the guard globally:

> app.module.ts

```ts
import { APP_GUARD } from '@nestjs/core'
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter'

@Module({
	imports: [RateLimiterModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RateLimiterGuard
		}
	]
})
export class ApplicationModule {}
```

### With Decorator

You can use the `@RateLimit` decorator to specify the points and duration for rate limiting on a per controller or per
route basis:

> app.controller.ts

```ts
import { RateLimit } from 'nestjs-rate-limiter'

@RateLimit({ keyPrefix: 'sign-up', points: 1, duration: 60, errorMessage: 'Accounts cannot be created more than once in per minute' })
@Get('/signup')
public async signUp() {
    console.log('hello')
}
```

### Dynamic Keyprefix

```ts
import { RateLimit } from 'nestjs-rate-limiter'

@RateLimit({
  keyPrefix: () => programmaticFuncThatReturnsValue(),
  points: 1,
  duration: 60,
  customResponseSchema: () => { return { timestamp: '1611479696', message: 'Request has been blocked' }}
})
@Get('/example')
public async example() {
    console.log('hello')
}
```

### With All Options

The usage of the limiter options is as in the code block below. For an explanation of the each option, please refer to the `src/modules/libs/rate-limiter/default-options.ts` file.

```ts
@Module({
	imports: [
		// All the values here are defaults.
		RateLimiterModule.register({
			for: 'Express',
			type: 'Memory',
			keyPrefix: 'global',
			points: 4,
			pointsConsumed: 1,
			inmemoryBlockOnConsumed: 0,
			duration: 1,
			blockDuration: 0,
			inmemoryBlockDuration: 0,
			queueEnabled: false,
			whiteList: [],
			blackList: [],
			storeClient: undefined,
			insuranceLimiter: undefined,
			execEvenly: false,
			execEvenlyMinDelayMs: undefined,
			indexKeyPrefix: {},
			maxQueueSize: 100,
			omitResponseHeaders: false,
			errorMessage: 'Rate limit exceeded',
			logger: true,
			customResponseSchema: undefined
		})
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RateLimiterGuard
		}
	]
})
export class ApplicationModule {}
```

### Fastify based Graphql

If you want to use this library on a fastify based graphql server, you need to override the graphql context in the app.module as shown below.

```ts
GraphQLModule.forRoot({
    context: ({ request, reply }) => {
        return { req: request, res: reply }
    },
}),
```

# Options

#### ● for

<code> Default: 'Express'</code>
<br>
<code> Type: 'Express' | 'Microservice' | 'ExpressGraphql'</code>
<br>

In this option, you specify what the technology is running under the Nest application. The wrong value causes to limiter not working.

#### ● type

<code> Default: 'Memory'</code>
<br>
<code> Type: 'Memory' | 'Redis'</code>
<br>

Here you define where the limiter data will be stored. Each option plays a different role in limiter performance, to see that please check the benchmark section below.

#### ● keyPrefix

<code> Default: 'global'</code>
<br>
<code> Type: string</code>
<br>

For creating several limiters with different options to apply different modules/endpoints.

Set to empty string '', if keys should be stored without prefix.

Note: for some limiters it should correspond to Storage requirements for tables or collections name, as keyPrefix may be used as their name.

#### ● points

<code> Default: 4</code>
<br>
<code> Type: number</code>
<br>

Maximum number of points can be consumed over duration.

#### ● pointsConsumed

<code> Default: 1</code>
<br>
<code> Type: number</code>
<br>

You can consume more than 1 point per invocation of the rate limiter.

For instance if you have a limit of 100 points per 60 seconds, and pointsConsumed is set to 10, the user will effectively be able to make 10 requests per 60 seconds.

#### ● inmemoryBlockOnConsumed

<code> Default: 0</code>
<br>
<code> Type: number</code>
<br>

For Redis.

Can be used against DDoS attacks. In-memory blocking works in current process memory and for consume method only.

It blocks a key in memory for msBeforeNext milliseconds from the last consume result, if inmemoryBlockDuration is not set. This helps to avoid extra requests.
It is not necessary to increment counter on store, if all points are consumed already.

#### ● duration

<code> Default: 1</code>
<br>
<code> Type: number</code>
<br>

Number of seconds before consumed points are reset.

Keys never expire, if duration is 0.

#### ● blockDuration

<code> Default: 0</code>
<br>
<code> Type: number</code>
<br>

If positive number and consumed more than points in current duration, block for blockDuration seconds.

#### ● inmemoryBlockDuration

<code> Default: 0</code>
<br>
<code> Type: number</code>
<br>

For Redis.

Block key for inmemoryBlockDuration seconds, if inmemoryBlockOnConsumed or more points are consumed. Set it the same as blockDuration option for distributed application to have consistent result on all processes.

#### ● queueEnabled

<code> Default: false</code>
<br>
<code> Type: boolean</code>
<br>

It activates the queue mechanism, and holds the incoming requests for <code>duration</code> value.

#### ● whiteList

<code> Default: []</code>
<br>
<code> Type: string[]</code>
<br>

If the IP is white listed, consume resolved no matter how many points consumed.

#### ● blackList

<code> Default: []</code>
<br>
<code> Type: string[]</code>
<br>

If the IP is black listed, consume rejected anytime. Blacklisted IPs are blocked on code level not in store/memory. Think of it as of requests filter.

#### ● storeClient

<code> Default: undefined</code>
<br>
<code> Type: any</code>
<br>

Required for Redis.

Have to be redis, ioredis, memcached, mongodb, pg, mysql2, mysql or any other related pool or connection.

#### ● insuranceLimiter

<code> Default: undefined</code>
<br>
<code> Type: any</code>
<br>

Default: undefined For Redis.

Instance of RateLimiterAbstract extended object to store limits, when database comes up with any error.

All data from insuranceLimiter is NOT copied to parent limiter, when error gone

Note: insuranceLimiter automatically setup blockDuration and execEvenly to same values as in parent to avoid unexpected behaviour.

#### ● execEvenly

<code> Default: false</code>
<br>
<code> Type: boolean</code>
<br>

Delay action to be executed evenly over duration First action in duration is executed without delay. All next allowed actions in current duration are delayed by formula msBeforeDurationEnd / (remainingPoints + 2) with minimum delay of duration \* 1000 / points It allows to cut off load peaks similar way to Leaky Bucket.

Note: it isn't recommended to use it for long duration and few points, as it may delay action for too long with default execEvenlyMinDelayMs.

#### ● execEvenlyMinDelayMs

<code> Default: duration \* 1000 / points</code>
<br>
<code> Type: number</code>
<br>

Sets minimum delay in milliseconds, when action is delayed with execEvenly

#### ● indexKeyPrefix

<code> Default: {}</code>
<br>
<code> Type: {}</code>
<br>

Object which is used to create combined index by {...indexKeyPrefix, key: 1} attributes.

#### ● maxQueueSize

<code> Default: 100</code>
<br>
<code> Type: number</code>
<br>

Determines the maximum number of requests in the queue and returns <code>429</code> as response to requests that over of the maxQueueSize.

#### ● omitResponseHeaders

<code> Default: false</code>
<br>
<code> Type: boolean</code>
<br>

Whether or not the rate limit headers (<code>X-Retry-After</code>, <code>X-RateLimit-Limit</code>, <code>X-Retry-Remaining</code>, <code>X-Retry-Reset</code>) should be omitted in the response.

#### ● errorMessage

<code> Default: 'Rate limit exceeded'</code>
<br>
<code> Type: string</code>
<br>

errorMessage option can change the error message of rate limiter exception.

#### ● logger

<code> Default: true</code>
<br>
<code> Type: boolean</code>
<br>

logger option allows to enable or disable logging from library.

#### ● customResponseSchema

<code> Default: undefined </code>
<br>
<code> Type: string</code>
<br>

customResponseSchema option allows to provide customizable response schemas

# Override Functions

It's possible to override <code>getIpFromRequest</code> function by extending <code>RateLimiterGuard</code> class.

```ts
import type { Request } from 'express'
import { RateLimiterGuard } from 'nestjs-rate-limiter'

class ExampleRateLimiterGuard extends RateLimiterGuard {
	protected getIpFromRequest(request: Request): string {
		return request.get('x-forwarded-for')
	}
}
```

# Benchmarks

1000 concurrent clients with maximum 2000 requests per sec during 30 seconds.

```
1. Memory     0.34 ms
2. Redis      2.45 ms
```

500 concurrent clients with maximum 1000 req per sec during 30 seconds

## Limitations

- No Websocket Support
- NoRpc Support
