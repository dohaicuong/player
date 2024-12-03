import { createClient, type NormalizeOAS } from 'fets'
import type schema from './content-gateway-v3-schema'

export const contentGatewayV3 = createClient<NormalizeOAS<typeof schema>>({
  endpoint: `${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/content-gateway` as never,
})
