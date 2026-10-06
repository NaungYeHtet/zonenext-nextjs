---
title: Preserve External Request Contracts
impact: CRITICAL
impactDescription: Prevents silent API contract drift hidden by structural typing
tags: typescript, api, sdk, correctness
---

## Preserve External Request Contracts

Do not manually reconstruct an SDK/API request object when the downstream client already accepts that same typed contract directly.

This pattern looks type-safe, but it creates a lossy wrapper that TypeScript cannot keep in sync with the external contract:

- omitted optional fields are silently dropped
- new SDK fields can be ignored without compile errors
- the code gives the appearance of normalization without adding real validation or narrowing

If you need to pass through a typed request and override one or two fields, spread the request directly. If you intentionally want a narrower API surface, define a separate local input type and map from that narrower type into the SDK contract.

**Incorrect (same request type in and out, manual whitelist):**

```typescript
function buildListPayload(request: DeviceApiGetDeviceListRequest): DeviceApiGetDeviceListRequest {
  return {
    ...(request.page !== undefined && { page: request.page }),
    ...(request.noRecords !== undefined && { noRecords: request.noRecords }),
    ...(request.searchBy !== undefined && { searchBy: request.searchBy }),
    ...(request.type !== undefined && { type: request.type }),
    ...(request.withZone !== undefined && { withZone: request.withZone })
  }
}

return deviceApi.getDeviceList(buildListPayload(request))
```

Why this is incorrect:

- the helper does not strengthen compile-time checking
- the client already accepts `DeviceApiGetDeviceListRequest`
- supported request fields can be silently stripped
- future SDK fields can be forgotten without any type error

**Correct (pass the typed request through directly):**

```typescript
return deviceApi.getDeviceList(request)
```

**Correct (override a field without rebuilding the whole contract):**

```typescript
return deviceApi.getDeviceList({
  ...request,
  locationId
})
```

**Correct (map from an intentionally narrower local type):**

```typescript
type LocalDeviceQuery = {
  locationId?: number
  zoneId?: string
  type?: DeviceApiGetDeviceListRequest["type"]
}

function toDeviceListRequest(query: LocalDeviceQuery): DeviceApiGetDeviceListRequest {
  return {
    locationId: query.locationId,
    zoneId: query.zoneId,
    type: query.type
  }
}
```

Use a mapping helper only when it does real work, for example:

- converting from a different local/domain type
- renaming fields
- normalizing values (`Date` to ISO string, enum mapping, UUID conversion)
- injecting defaults or auth-derived fields into a narrower local API

Avoid helpers where the input type and output type are the same external request contract and the body is only a selective field copy.