export default {
  "openapi": "3.0.0",
  "paths": {
    "/v3/learning-objects/{id}": {
      "get": {
        "operationId": "learning-objects-v3-get",
        "summary": "Retrieve a Learning Object",
        "description": "Retrieves the details of a Learning Object by either id (uuid) or our legacy gc_lo_id (integer). By default, only the `core` set of fields is returned. Use the `include[]` query parameter to retrieve additional information about the Learning Object, such as `pricing`, `lifecycle` or `relevance`.",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Unique identifier of the Learning Object",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "identifier",
            "required": false,
            "in": "query",
            "description": "The `identifier` query parameter allows you to specify the identifier you would like to use when looking up a learning object. \n\n The available values are: \n- `external_id`: The API will consider the supplied {id} as the external_id, and will look up the learning object that corresponds to the provided external_id.",
            "example": "external_id",
            "schema": {
              "enum": [
                "external_id"
              ],
              "type": "string"
            }
          },
          {
            "name": "include[]",
            "required": false,
            "in": "query",
            "description": "Returns extended information related to the Learning Object. \n\n Enum:\n- `core`, returns the `core` object.\n- `pricing`, returns the `pricing` object.\n- `lifecycle`, returns the `lifecycle` object.\n- `relevance`, returns the `relevance` object.\n- `skills`, returns the `skills` object.\n- `quality`, returns the `quality` object.\n- `provider`, returns the `provider` object.\n- `protected`, returns the `protected` object.\n- `playback_behavior`, returns the `playback_behavior` object.\n- `images`, returns the `images` object.\n- `preview`, returns the `preview` object.\n- `tags`, returns the `tags` object.\n- `topics`, returns the `topics` object.\n- `revisions`, returns the `revisions` object. \n\n If the `include[]` parameter is not supplied, the `core` fields will be returned by default. See the response schema for a list of fields that can be expected with each of the objects defined above.",
            "schema": {
              "default": "core",
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "alternatives",
                  "core",
                  "images",
                  "lifecycle",
                  "playback_behavior",
                  "preview",
                  "pricing",
                  "protected",
                  "provider",
                  "quality",
                  "relevance",
                  "skills",
                  "tags",
                  "topics",
                  "revisions",
                  "generated_metadata"
                ]
              }
            }
          },
          {
            "name": "hydrate[]",
            "required": false,
            "in": "query",
            "description": "Returns extended information related to the Learning Object. \n\n Enum:\n- `core` hydrates the `core` object. \n\n All fragments are hydrated by default.`",
            "schema": {
              "default": "core",
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "alternatives",
                  "core",
                  "images",
                  "lifecycle",
                  "playback_behavior",
                  "preview",
                  "pricing",
                  "protected",
                  "provider",
                  "quality",
                  "relevance",
                  "skills",
                  "tags",
                  "topics",
                  "revisions",
                  "generated_metadata"
                ]
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The requested Learning Object",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Content"
                }
              }
            }
          },
          "400": {
            "description": "Occurs when invalid query parameters are provided"
          },
          "401": {
            "description": "Occurs when the request failed to provide a valid JWT."
          },
          "403": {
            "description": "Insufficient roles for this resource."
          },
          "404": {
            "description": "Occurs when there's no Learning Object found with the given id"
          },
          "500": {
            "description": "Occurs when a subsequent API call of Go1 internal services has fallen over."
          }
        },
        "tags": [
          "Learning objects"
        ],
        "security": [
          {
            "bearer": []
          },
          {
            "oauth2": [
              "lo.read"
            ]
          }
        ]
      }
    },
    "/v3/learning-objects": {
      "get": {
        "operationId": "learning-objects-v3-search",
        "summary": "List all Learning Objects",
        "description": "Returns a list of Learning Objects.",
        "parameters": [
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "A limit on the number of objects to be returned, between 1 and 50. The default is 20. When `use_scroll` is activated, the maximum limit increases to 5000.",
            "example": 20,
            "schema": {
              "default": 20,
              "type": "number"
            }
          },
          {
            "name": "offset",
            "required": false,
            "in": "query",
            "description": "For use in pagination. The item number within a list request to start displaying results after. For example, a request with `limit=20` and `offset=20`, returns items 21 - 40. Note, pagination using the offset parameters cannot exceed 10,000 results.",
            "example": 20,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "keyword",
            "required": false,
            "in": "query",
            "description": "A search for Learning Objects based on one or more keywords.",
            "example": "Excel",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "sort",
            "required": false,
            "in": "query",
            "description": "Sorts the results of your request by a given property. \n\nEnum:\n- `created`, sorts Learning Objects based on their creation date.\n- `popularity`, sorts Learning Objects based on total number of enrollments.\n-`price`, sorts Learning Objects based on their price.\n-`relevance`, sorts Learning Objects based on how relevant they are for you and your provided search terms and filters.\n-`title`, sorts Learning Objects alphabetical by their title.\n-`retired_time`, sorts Learning Objects based on the date they are scheduled for decommissioning.\n-`rating`, sorts Learning Objects based on their average user rating.\n-`updated_time`, sorts Learning Objects based on when they were last updated or modified.\nIf used with the 'keyword' parameter, the default sort order is by relevance. Otherwise, the default sort order is by title (alphabetical order). \n\n To sort by multiple properties, send comma-separated values, for example: `sort=price,title`. This will sort the Learning Objects by price first, then by title.",
            "example": "created",
            "schema": {
              "enum": [
                "created",
                "popularity",
                "price",
                "relevance",
                "title",
                "retired_time",
                "rating",
                "updated_time"
              ],
              "type": "string"
            }
          },
          {
            "name": "order",
            "required": false,
            "in": "query",
            "description": "Orders the results by a given direction. Enum: `asc`, `desc`. The default value is descending. \n\n To order multiple sort properties, send comma-separated values, for example: `order=asc,desc`. Must be used with the ‘sort’ parameter.",
            "example": "asc",
            "schema": {
              "default": "desc",
              "enum": [
                "asc",
                "desc"
              ],
              "type": "string"
            }
          },
          {
            "name": "collection",
            "required": false,
            "in": "query",
            "description": "Returns Learning Objects base on given collection. Enum: `library`, `not_added_to_library`, `subscribe`. \n\n Examples: \n- `collection=subscribe`. Returns Learning Objects that are available on this Portal. \n- `collection=library`. Returns Learning Objects that are added in the user's library. \n- `collection=not_added_to_library`. Returns Learning Objects that have not been added to the user's library.",
            "example": "library",
            "schema": {
              "enum": [
                "library",
                "not_added_to_library",
                "subscribe"
              ],
              "type": "string"
            }
          },
          {
            "name": "providers[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by provider, specified by the provider ID. \n\n Examples: \n- `providers[]=150`, returns Learning Objects by provider `#150`. \n- `providers[]=150&providers[]2000`, returns Learning Objects by provider `#150` and provider `#2000`.",
            "example": 150,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "entry_level[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by entry level. Enum: `beginner`, `intermediate`, `advanced`, `anyone`. \n\n Examples: \n- `entry_level[]=beginner`, returns Learning Objects where entry level is `beginner`. \n- `entry_level[]=beginner&entry_level[]=anyone`, returns Learning Objects where entry level is `intermediate` or `anyone`.",
            "example": "advanced",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "beginner",
                  "intermediate",
                  "advanced",
                  "anyone"
                ]
              }
            }
          },
          {
            "name": "language[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by language, and optionally locale. Accepts two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) codes for languages in lowercase, and optionally two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes for countries in lowercase, separated by a hyphen. \n\n Examples: \n- `language[]=en-us`, returns Learning Objects where the language is English (United States). \n- `language[]=en-gb`, returns Learning Objects where the language is English (United Kingdom). \n- `language[]=es&language[]=sv`, returns Learning Objects where the language is Spanish or Swedish.",
            "example": "id",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "mobile_optimised",
            "required": false,
            "in": "query",
            "description": "Filters learning objects that are optimised for mobile playback.",
            "example": "mobile_optimised=true",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "region_relevance[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by region relevance. Region values include: `GLOBAL`, `MY`, `UAE`, `US`, `AU`, `NZ`, `CA`, `GB`, `ZA`. \n\n Examples: \n- `region_relevance[]=AU`, returns Learning Objects relevant to `AU`. \n- `region_relevance[]=AU&region_relevance[]=GLOBAL`, returns Learning Objects relevant to `AU` and `GLOBAL`.",
            "example": "AU",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "GLOBAL",
                  "MY",
                  "UAE",
                  "US",
                  "AU",
                  "NZ",
                  "CA",
                  "GB",
                  "ZA"
                ]
              }
            }
          },
          {
            "name": "locale[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by locale. Locale values include:\n `en-AU`, `en-US`, `en-UK`. \n\n Examples:\n- `locale[]=en-AU`, returns Learning Objects relevant to `en-AU`.\n- `locale[]=en-AU&locale[]=en-US`, returns Learning Objects relevant to `en-AU` and `en-US`.",
            "example": "en-AU",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "en-AU",
                  "en-US",
                  "en-UK"
                ]
              }
            }
          },
          {
            "name": "duration[][]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by a duration range. Will return Learning Objects with the specified duration or longer. \n\n Examples: \n- `duration[0][min]=0&duration[0][max]=15&duration[1][min]=60`, returns Learning Objects with the duration between 0 and 15 minutes, or greater than or equal to 60 minutes. \n- `duration[][max]=60`, returns Learning Objects with the duration less than or equal to 60 minutes.",
            "example": "duration[0][min]=0&duration[0][max]=15&duration[1][min]=60",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "skills[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by skills they are associated with. \n\n Examples: \n- `skills[]=excel`, returns Learning Objects associated with the skill `excel`. \n- `skills[]=mathematics&skills[]=leadership`, returns Learning Objects associated with the skills `mathematics`, `leadership`, or both. ",
            "example": "Excel",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "topics[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by topic. \n\n Examples: \n- `topics[]=sales`, returns Learning Objects associated with the topic `sales`. \n- `topics[]=leadership&topics[]=sales`, returns Learning Objects associated with the topic `sales`, `leadership`, or both.",
            "example": "Accounting and Finance",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "tags[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by tags. \n\n Examples: \n- `tags[]=Agile`, returns Learning Objects that are tagged with `Agile`. \n- `tags[]=Agile&tags[]=Business Skills`, returns Learning Objects that are tagged with `Agile`, `Business Skills`, or both.",
            "example": "Excel",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "type[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by type. Enum: `course`, `playlist`, `document`, `link`, `interactive`, `text`, `video`, `audio`. \n\n Examples: \n- `type[]=course`, returns `course` type Learning Objects. \n- `type[]=video`, returns `video` type Learning Objects. \n- `type[]=course&type[]=video`, returns `course` and `video` type Learning Objects.",
            "example": "interactive",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "course",
                  "playlist",
                  "document",
                  "link",
                  "interactive",
                  "text",
                  "video",
                  "audio"
                ]
              }
            }
          },
          {
            "name": "facets[]",
            "required": false,
            "in": "query",
            "description": "The facets[] query parameter allows you to request facets to be included in the API response. Facets represent sets of data associated with a queried list of learning objects, often used to display filtering options in a search interface. Enum:\n  * `providers`\n  * `language`\n  * `mobile_optimised`\n  * `region_relevance`\n  * `topics`\n  * `entry_level`\n  * `duration`\n  * `type`\n  * `locale`",
            "example": "duration",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "providers",
                  "language",
                  "mobile_optimised",
                  "region_relevance",
                  "topics",
                  "duration",
                  "entry_level",
                  "type",
                  "locale"
                ]
              }
            }
          },
          {
            "name": "id[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by id.",
            "example": [
              13399524,
              18187331
            ],
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "state",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by its lifecycle state.",
            "example": "retired",
            "schema": {
              "enum": [
                "draft",
                "published",
                "retired",
                "removed"
              ],
              "type": "string"
            }
          },
          {
            "name": "created_time[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by their `created_time` time in ISO-8601 format. Use it to identify Learning Objects that were created recently.\n\n- `[min]` will match all records *greater than or equal to* this date\n- `[max]` will match all records *less than or equal to* this date\n\nExamples:\n\n- `created_time[min]=2024-07-01` – Returns all Learning Objects created after July 1st, 2024\n- `created_time[min]=2024-01-01&created_time[max]=2024-06-30` – Returns all Learning Objects created between January 1st, 2024 and June 30th, 2024\n- `created_time[max]=2022-01-01` – Returns all Learning Objects that were created prior to January 1st, 2022",
            "example": "created_time[min]=2024-01-01&created_time[max]=2024-06-30",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "updated_time[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by their `updated_time` time in ISO-8601 format. Use it to identify Learning Objects that were updated recently.\n\n- `[min]` will match all records *greater than or equal to* this date\n- `[max]` will match all records *less than or equal to* this date\n\nExamples:\n\n- `updated_time[min]=2024-07-01` – Returns all Learning Objects updated after July 1st, 2024\n- `updated_time[min]=2024-01-01&updated_time[max]=2024-06-30` – Returns all Learning Objects updated between January 1st, 2024 and June 30th, 2024\n- `updated_time[max]=2022-01-01` – Returns all Learning Objects that haven’t been updated since January 1st, 2022",
            "example": "updated_time[min]=2024-01-01&updated_time[max]=2024-06-30",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "retired_time[]",
            "required": false,
            "in": "query",
            "description": "Filters Learning Objects by its retired_time time range in ISO-8601 format. Use it with `state` of published, retired to find when content is retiring soon or retired. E.g. use `retired_time[min]=2022-11-01` and `retired_time[max]=2023-12-30` for state of `published|retired`; use `retired_time[]=false` and state not provided to get ALL retirement states.",
            "example": "retired_time[min]=2022-11-01&retired_time[max]=2023-12-30",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "exclude_providers",
            "required": false,
            "in": "query",
            "description": "Provider operation, used to filter out providers. This is used in combination with the providers parameter.",
            "example": "exclude_providers=true",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "use_scroll",
            "required": false,
            "in": "query",
            "description": "Activates “scrolling” mode to paginate through large result sets.\n\nAs standard pagination with offset parameter is limited to 10,000 results, pass `use_scroll=true` along with `scroll_id` parameter to paginate beyond this limit.\n\nHow it works:\n- When `use_scroll=true` is set, the response includes a `next_scroll_id` property in the body.\n- This `next_scroll_id` is valid for 5 minutes and is used to retrieve the next page of results.\n- The number of result per page is determined by the `limit` parameter.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "scroll_id",
            "required": false,
            "in": "query",
            "description": "The pointer to the next page of results, obtained from a previous scroll request.\n\nUsage:\n- Initial request: pass `use_scroll=true`, and store the value of `next_scroll_id` property from the response.\n- Subsequent requests: pass `use_scroll=true&scroll_id={next_scroll_id}` where `{next_scroll_id}` is the value from the previous response.\n\nNotes:\n- Each `next_scroll_id` value is valid for 5 minutes.\n- Only works with `facets[]` query parameter on the first scroll request (i.e. `use_scroll=true`). All other `scroll_id` requests will not return any requested `facets[]`.\n\nErrors:\n- Returns 400 (Invalid request) for invalid `scroll_id` values.\n- Returns 404 (Not found) for expired `scroll_id` values.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "include[]",
            "required": false,
            "in": "query",
            "description": "Returns extended information related to the learning object. \n\n Enum:\n- `core`, returns the `core` object.\n- `pricing`, returns the `pricing` object.\n- `lifecycle`, returns the `lifecycle` object.\n- `relevance`, returns the `relevance` object.\n- `revisions`, returns the `revisions` object.\n- `skills`, returns the `skills` object.\n- `quality`, returns the `quality` object.\n- `provider`, returns the `provider` object.\n- `playback_behavior`, returns the `playback_behavior` object. \n\n If the `include[]` parameter is not supplied, the `core` fields will be returned by default. See the response schema for a list of fields that can be expected with each of the objects defined above.",
            "schema": {
              "default": "core",
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "core",
                  "relevance",
                  "pricing",
                  "lifecycle",
                  "skills",
                  "quality",
                  "revisions",
                  "provider",
                  "playback_behavior"
                ]
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Returns a list of Learning Objects.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContentSearch"
                }
              }
            }
          },
          "400": {
            "description": "Occurs when invalid query parameters are provided."
          },
          "401": {
            "description": "Occurs when the request failed to provide a valid JWT."
          },
          "403": {
            "description": "Insufficient roles for this resource."
          },
          "500": {
            "description": "Occurs when a subsequent API call of Go1 internal services has fallen over."
          }
        },
        "tags": [
          "Learning objects"
        ],
        "security": [
          {
            "bearer": []
          },
          {
            "oauth2": [
              "lo.read"
            ]
          }
        ]
      },
      "post": {
        "operationId": "learning-objects-v3-create",
        "summary": "Create a Learning Object",
        "description": "Creates a new Learning Object.",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ContentCreationRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Learning Object has been successfully created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContentCreationResponse"
                }
              }
            }
          },
          "400": {
            "description": "Occurs when the request body fails LO validations."
          },
          "401": {
            "description": "Occurs when the request failed to provide a valid JWT."
          },
          "403": {
            "description": "Insufficient roles for this resource."
          },
          "500": {
            "description": "Occurs when a subsequent API call of Go1 internal services has fallen over."
          }
        },
        "tags": [
          "Learning objects"
        ],
        "security": [
          {
            "bearer": []
          },
          {
            "oauth2": [
              "lo.write"
            ]
          }
        ]
      }
    },
    "/v3/learning-objects/{id}/set": {
      "post": {
        "operationId": "learning-objects-v3-update",
        "summary": "Update a Learning Object",
        "description": "Updates the details of a Learning Object. This action is limited to the owner of the Learning Object.",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "The unique identifier for the learning object.",
            "example": "con_01HBYXF3HYPTG5Q1RJ7BPFAF23",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "identifier",
            "required": false,
            "in": "query",
            "description": "The `identifier` query parameter allows you to specify the identifier you would like to use when looking up a learning object. \n\n The available values are: \n- `external_id`: The API will consider the supplied {id} as the external_id, and will look up the learning object that corresponds to the provided external_id.",
            "example": "external_id",
            "schema": {
              "enum": [
                "external_id"
              ],
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ContentUpdatingRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Learning Object has been successfully updated.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContentUpdatingResponse"
                }
              }
            }
          },
          "400": {
            "description": "Occurs when the request body fails LO validations."
          },
          "401": {
            "description": "Occurs when the request failed to provide a valid JWT."
          },
          "403": {
            "description": "Insufficient roles for this resource."
          },
          "500": {
            "description": "Occurs when a subsequent API call of Go1 internal services has fallen over."
          }
        },
        "tags": [
          "Learning objects"
        ],
        "security": [
          {
            "bearer": []
          },
          {
            "oauth2": [
              "lo.write"
            ]
          }
        ]
      }
    },
    "/v3/learning-objects/{id}/premium": {
      "get": {
        "operationId": "v3-get-premium-review",
        "summary": "Retrieve a learning object's premium submission",
        "description": "Retrieves the status of learning objects submission to the Go1 Premium product offering.",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Unique identifier of the content object.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "identifier",
            "required": false,
            "in": "query",
            "description": "The `identifier` query parameter allows you to specify the identifier you would like to use when looking up a learning object. \n\n The available values are: \n- `external_id`: The API will consider the supplied {id} as the external_id, and will look up the learning object that corresponds to the provided external_id.",
            "example": "external_id",
            "schema": {
              "enum": [
                "external_id"
              ],
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Status of the Premium Review submission for a given piece of content.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PremiumReviewGetResponse"
                }
              }
            }
          },
          "400": {
            "description": "Occurs when the request body fails input validations."
          },
          "401": {
            "description": "Occurs when the request failed to provide a valid JWT."
          },
          "403": {
            "description": "Insufficient roles for this resource."
          },
          "500": {
            "description": "Occurs when a subsequent API call of Go1 internal services has fallen over."
          }
        },
        "tags": [
          "Learning objects"
        ],
        "security": [
          {
            "bearer": []
          },
          {
            "oauth2": [
              "lo.read"
            ]
          }
        ]
      },
      "post": {
        "operationId": "v3-post-premium-review",
        "summary": "Submit a learning object to premium",
        "description": "Submits a learning object to the Go1 Premium product offering. The learning object will go through a review and approval process.",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Unique identifier of the content object.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "identifier",
            "required": false,
            "in": "query",
            "description": "The `identifier` query parameter allows you to specify the identifier you would like to use when looking up a learning object. \n\n The available values are: \n- `external_id`: The API will consider the supplied {id} as the external_id, and will look up the learning object that corresponds to the provided external_id.",
            "example": "external_id",
            "schema": {
              "enum": [
                "external_id"
              ],
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Status of the Premium Review submission for a given piece of content.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PremiumReviewPostResponse"
                }
              }
            }
          },
          "400": {
            "description": "Occurs when the request body fails input validations."
          },
          "401": {
            "description": "Occurs when the request failed to provide a valid JWT."
          },
          "403": {
            "description": "Insufficient roles for this resource."
          },
          "500": {
            "description": "Occurs when a subsequent API call of Go1 internal services has fallen over."
          }
        },
        "tags": [
          "Learning objects"
        ],
        "security": [
          {
            "bearer": []
          },
          {
            "oauth2": [
              "lo.write"
            ]
          }
        ]
      }
    }
  },
  "info": {
    "title": "content-gateway",
    "description": "The service that acts as the gateway for all operations related towards the content domain.",
    "version": "3.0.0",
    "contact": {}
  },
  "tags": [],
  "servers": [
    {
      "url": "https://api.qa.go1.cloud/content-gateway",
      "description": "QA Environment",
      "variables": {}
    },
    {
      "url": "https://api.go1.co/content-gateway",
      "description": "PROD Environment",
      "variables": {}
    }
  ],
  "components": {
    "securitySchemes": {
      "bearer": {
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "type": "http"
      },
      "oauth2": {
        "type": "oauth2",
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "https://auth.go1.com/oauth/authorize",
            "tokenUrl": "https://auth.go1.com/oauth/token",
            "scopes": {
              "lo.read": "Read access to your portal's learning objects.",
              "lo.write": "Write access to your portal's learning objects."
            }
          }
        }
      }
    },
    "schemas": {
      "Media": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "description": "A unique key for the media."
          },
          "value": {
            "type": "string",
            "description": "Stores the actual media or a representation of the resource the media is referring to. For example, depending on the context the content of the value can be: \n- Direct Link: If the resource is externally hosted, 'value' can contain a URL or URI pointing to the location where the resource is accessible. \n- Raw Data: For resources that are self-contained or need to be stored within the object for immediate access, 'value' can hold the raw data directly. \n- Reference Identifier: In scenarios where the resource is part of a larger dataset or system, value can contain an identifier that uniquely points to the resource within that context."
          },
          "mimetype": {
            "type": "string",
            "description": "MIME type for the media."
          }
        },
        "required": [
          "key",
          "value",
          "mimetype"
        ]
      },
      "CoreFragment": {
        "type": "object",
        "properties": {
          "creators": {
            "description": "An array containing the User Account id's of the Go1 user(s) who created the Learning Object.",
            "example": [
              "usr_01HBYXG21DRXDQ6XBNMDJ8WTMH",
              "usr_01HBYXGCF2HYX5925YBKPMS4TA"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "type": {
            "type": "string",
            "description": "The learning object type. Enum: `audio`, `course`, `document`, `event`, `interactive`, `link`, `lti`, `text`, `video`.",
            "enum": [
              "course",
              "group",
              "playlist",
              "module",
              "assignment",
              "audio",
              "document",
              "event",
              "interactive",
              "manual",
              "link",
              "lti",
              "question",
              "quiz",
              "text",
              "video"
            ],
            "example": "course"
          },
          "title": {
            "type": "string",
            "description": "The title or name of the learning object.",
            "example": "Introduction to Programming"
          },
          "description": {
            "type": "string",
            "description": "A brief description or overview of the learning object.",
            "example": "Learn the basics of programming with this comprehensive course."
          },
          "image": {
            "description": "The URL of a thumbnail image associated with the learning object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/Media"
              }
            ]
          },
          "external_id": {
            "type": "string",
            "description": "An external source identifier from where the content originated.",
            "example": "course123"
          },
          "provider_id": {
            "type": "string",
            "description": "The identifier for the content provider’s portal, where the learner object was created.",
            "example": "9876"
          },
          "standalone": {
            "type": "boolean",
            "description": "Flag to indicate if this learning content is a standalone item or not. Possible values `0` or `1`.",
            "example": true
          }
        },
        "required": [
          "creators",
          "type",
          "title",
          "description",
          "image",
          "external_id",
          "provider_id",
          "standalone"
        ]
      },
      "PendingState": {
        "type": "object",
        "properties": {
          "removed_time": {
            "format": "date-time",
            "type": "string",
            "description": "The date and time at which the learning object will be (or was) removed. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          },
          "retired_time": {
            "format": "date-time",
            "type": "string",
            "description": "The date and time when the learning object is scheduled for decommissioning. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          }
        }
      },
      "LifecycleFragment": {
        "type": "object",
        "properties": {
          "state": {
            "type": "string",
            "description": "The state of the content in coherence with the Go1 Content Lifecycle.",
            "example": "published",
            "enum": [
              "draft",
              "published",
              "retired",
              "removed"
            ]
          },
          "pending_state": {
            "description": "Pending state transitions.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PendingState"
              }
            ]
          }
        },
        "required": [
          "state"
        ]
      },
      "RelevanceAuthorFragment": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the author of this content"
          },
          "about": {
            "type": "string",
            "description": "A short summary of the author for this content"
          }
        },
        "required": [
          "name",
          "about"
        ]
      },
      "RelevanceFragment": {
        "type": "object",
        "properties": {
          "duration": {
            "type": "number",
            "description": "The duration of the learning object in minutes.",
            "example": 180
          },
          "language": {
            "type": "string",
            "description": "The language in which the learning object is presented. ISO-639 language code format, with an optional ISO-3166 two character country code, separated by a hyphen. For example: 'en', 'en-US', 'en-GB, 'es'.",
            "example": "en"
          },
          "year_created": {
            "type": "number",
            "description": "The year in which the learning object was created.",
            "example": 2022
          },
          "summary": {
            "type": "string",
            "description": "A brief summary of the content. Max length: 120 characters.",
            "example": "This course provides an intro to programming concepts and techniques."
          },
          "entry_level": {
            "type": "string",
            "description": "Contains key-value pairs representing the entry level of the learning object.",
            "example": "Intermediate"
          },
          "learning_outcomes": {
            "description": "Intended learning outcomes or objectives that learners can expect to achieve upon completing the learning object.",
            "example": [
              "Understand the fundamental concepts of object-oriented programming",
              "Create classes and objects in Python"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "region": {
            "description": "Regions in which learning object is available for consumption. If set to `GLOBAL`, it can be consumed throughout the globe. \n\n Available regions mapped to their key: \n- `495 - GLOBAL`, `496 - AU`, `497 - US`, `498 - GB`, `499 - NZ`, `500 - MY`, `501 - ZA`, `515 - CA`, `516 - UAE`",
            "example": [
              "GLOBAL",
              "AU"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "locale": {
            "description": "The locale of the learning object. Values include: `en-AU`, `en-US`, `en-UK`.",
            "example": [
              "en-AU",
              "en-US"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "author": {
            "description": "",
            "allOf": [
              {
                "$ref": "#/components/schemas/RelevanceAuthorFragment"
              }
            ]
          },
          "who_should_consume": {
            "type": "string",
            "description": "Short description of the target audience for this content"
          }
        },
        "required": [
          "language"
        ]
      },
      "TagsFragment": {
        "type": "object",
        "properties": {
          "items": {
            "description": "An array of descriptive tags associated with the Learning Object.",
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "items"
        ]
      },
      "TopicsFragment": {
        "type": "object",
        "properties": {
          "items": {
            "description": "The [topics](https://help.go1.com/en/articles/6767512-topics-taxonomy) associated with the learning object.",
            "example": [
              {
                "id": 64,
                "name": "Technology Skills"
              },
              {
                "id": 17,
                "name": "IT Software"
              },
              {
                "id": 110,
                "name": "Microsoft Products"
              }
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "items"
        ]
      },
      "PricingFragment": {
        "type": "object",
        "properties": {
          "price": {
            "type": "number",
            "description": "The price of the learning object.",
            "example": 19.99
          },
          "currency": {
            "type": "string",
            "description": "The currency in which the price is specified.",
            "example": "USD"
          }
        },
        "required": [
          "price",
          "currency"
        ]
      },
      "SkillFragmentItem": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name or title of the skill.",
            "example": "Sketch (design software)"
          },
          "confidence": {
            "type": "number",
            "description": "A numerical value indicating the confidence level of the skill associated with the learning object.",
            "example": 0.645941
          }
        },
        "required": [
          "name",
          "confidence"
        ]
      },
      "ProviderFragment": {
        "type": "object",
        "properties": {
          "logo": {
            "type": "string",
            "description": "The URL of the logo for the provider.",
            "example": "https://example.com/images/logo.png"
          },
          "name": {
            "type": "string",
            "description": "The name of the provider.",
            "example": "Learning Provider"
          },
          "social_links": {
            "description": "Links to social media accounts for this Provider.",
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "logo",
          "name"
        ]
      },
      "PlaybackBehaviorFragment": {
        "type": "object",
        "properties": {
          "launch_mode": {
            "type": "string",
            "description": "The launch mode of the Learning Object.",
            "example": "iframe"
          },
          "auto_complete": {
            "type": "boolean",
            "description": "The Learning Object will automatically mark itself as complete (if false - player will show 'mark as complete' button).",
            "example": true
          },
          "mobile_optimised": {
            "type": "boolean",
            "description": "The Learning Object can be played on a mobile device.",
            "example": true
          },
          "assessable": {
            "type": "boolean",
            "description": "The Learning Object contains assessable modules where the learner receives a score or feedback. (Includes any quizzes, assessments or knowledge checks)",
            "example": true
          },
          "wcag": {
            "type": "boolean",
            "description": "The Learning Object is compliant with WCAG 2.0A or equivalent standard.",
            "example": true
          }
        }
      },
      "UserRating": {
        "type": "object",
        "properties": {
          "ratings_count": {
            "type": "number",
            "description": "The total number of ratings given to the learning object.",
            "example": 68
          },
          "five_star_rating": {
            "type": "number",
            "description": "Ratings based on five-star reviews.",
            "example": 4.68
          }
        },
        "required": [
          "ratings_count",
          "five_star_rating"
        ]
      },
      "QualityFragment": {
        "type": "object",
        "properties": {
          "user_rating": {
            "description": "User rating associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UserRating"
              }
            ]
          },
          "reviews": {
            "description": "Reviews of the Learning Object.",
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "AlternativesFragment": {
        "type": "object",
        "properties": {
          "content": {
            "type": "string",
            "description": "An array containing a list of alternative learning object IDs. The list is sorted in descending order of relevance, with the most relevant"
          }
        }
      },
      "PreviewFragment": {
        "type": "object",
        "properties": {
          "media": {
            "description": "",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Media"
            }
          }
        }
      },
      "ImagesFragment": {
        "type": "object",
        "properties": {
          "media": {
            "description": "",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Media"
            }
          }
        }
      },
      "RevisionItem": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The ID of the learning content.",
            "example": "con_123e45"
          },
          "version": {
            "type": "string",
            "description": "Version of the content revision. The bigger the number, the newer the version.",
            "example": "1.0"
          }
        },
        "required": [
          "id",
          "version"
        ]
      },
      "RevisionsFragment": {
        "type": "object",
        "properties": {
          "{language_code}": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/RevisionItem"
            }
          }
        }
      },
      "Content": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "A new globally unique identifier for the learning object. The previous `id` and `lo_id` fields will become a `legacy_id` in future API versions.",
            "example": "con_01HBYXF3HYPTG5Q1RJ7BPFAF23"
          },
          "gc_lo_id": {
            "type": "string",
            "description": "The unique identifier for the learning object.",
            "example": "1234"
          },
          "updated_time": {
            "type": "string",
            "description": "The date and time when the learning object was last updated. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          },
          "created_time": {
            "type": "string",
            "description": "The date and time when the Learning Object was created. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          },
          "core": {
            "description": "The minimum core or essential information about the learning object, such as its title, description and image.",
            "allOf": [
              {
                "$ref": "#/components/schemas/CoreFragment"
              }
            ]
          },
          "lifecycle": {
            "description": "Information related to the various stages and statuses that the learning object may go through during its lifecycle.",
            "allOf": [
              {
                "$ref": "#/components/schemas/LifecycleFragment"
              }
            ]
          },
          "relevance": {
            "description": "Descriptive information to aid the consumer in understanding the relevance of this Learning Object for them.",
            "allOf": [
              {
                "$ref": "#/components/schemas/RelevanceFragment"
              }
            ]
          },
          "tags": {
            "description": "Descriptive tags associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/TagsFragment"
              }
            ]
          },
          "topics": {
            "description": "The topics associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/TopicsFragment"
              }
            ]
          },
          "protected": {
            "description": "Information that allows Go1 to consume the Learning Object.",
            "oneOf": [
              {
                "type": "object",
                "$ref": "#/components/schemas/BaseProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/AudioProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/DocumentProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/InteractiveProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/LinkProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/LTIProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/QuestionProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/QuizProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/VideoProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/CourseProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/ModuleProtectedFragment"
              }
            ]
          },
          "pricing": {
            "description": "Information about the price and currency of the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PricingFragment"
              }
            ]
          },
          "skills": {
            "description": "The skills that relate to the Learning Object.",
            "example": [
              {
                "name": "Sketch (design software)",
                "confidence": 0.645941
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SkillFragmentItem"
            }
          },
          "provider": {
            "description": "Information related to the provider who created the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/ProviderFragment"
              }
            ]
          },
          "playback_behavior": {
            "description": "Information related to the playback behavior of this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PlaybackBehaviorFragment"
              }
            ]
          },
          "quality": {
            "description": "Quality fields associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/QualityFragment"
              }
            ]
          },
          "alternatives": {
            "description": "Alternative content to this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/AlternativesFragment"
              }
            ]
          },
          "preview": {
            "description": "Information that can be used to preview this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PreviewFragment"
              }
            ]
          },
          "images": {
            "description": "Images related to displaying the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/ImagesFragment"
              }
            ]
          },
          "revisions": {
            "description": "Information related to the language/version of this Learning Object, and relationships with other languages/versions.",
            "example": {
              "en": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                }
              ],
              "fr": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                }
              ],
              "de": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                },
                {
                  "version": "2.0",
                  "id": "con_456e78"
                }
              ]
            },
            "allOf": [
              {
                "$ref": "#/components/schemas/RevisionsFragment"
              }
            ]
          },
          "generated_metadata": {
            "type": "object",
            "description": "Metadata generated by go1 to be used as an alternative to user provided metadata fragments. Each property within this fragment mirrors the schema of the metadata fragment it aims to replace.",
            "example": {
              "generated_metadata": {
                "topics": {
                  "items": [
                    {
                      "id": 64,
                      "name": "Technology Skills"
                    },
                    {
                      "id": 17,
                      "name": "IT Software"
                    },
                    {
                      "id": 110,
                      "name": "Microsoft Products"
                    }
                  ]
                }
              }
            }
          }
        },
        "required": [
          "id",
          "updated_time",
          "created_time"
        ]
      },
      "ContentSearchFacetBucket": {
        "type": "object",
        "properties": {
          "key": {
            "type": "number",
            "description": "Unique idenfitier that defines this facet bucket.",
            "example": "1.0-15.0"
          },
          "count": {
            "type": "number",
            "description": "Total number of Learning Objects that match this facet bucket.",
            "example": 1393
          },
          "from": {
            "type": "number",
            "description": "Only returned with `duration` facet.",
            "example": 1
          },
          "to": {
            "type": "number",
            "description": "Only returned with `duration` facet.",
            "example": 15
          },
          "name": {
            "type": "number",
            "description": "Only returned with `providers` facet.",
            "example": "O Reilly"
          }
        }
      },
      "ContentSearchFacets": {
        "type": "object",
        "properties": {
          "providers": {
            "description": "Buckets for the providers facet.",
            "example": [
              {
                "key": 2160967,
                "name": "O Reilly",
                "count": 5503
              },
              {
                "key": 2160986,
                "name": "Roberto Blake",
                "count": 1956
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchFacetBucket"
            }
          },
          "language": {
            "description": "Buckets for the language facet.",
            "example": [
              {
                "key": "en",
                "count": 60614
              },
              {
                "key": "es",
                "count": 42
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchFacetBucket"
            }
          },
          "region_relevance": {
            "description": "Buckets for the region_relevance facet.",
            "example": [
              {
                "key": "GLOBAL",
                "count": 3004
              },
              {
                "key": "AU",
                "count": 138
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchFacetBucket"
            }
          },
          "locale": {
            "description": "Buckets for the locale facet.",
            "example": [
              {
                "key": "en-US",
                "count": 3004
              },
              {
                "key": "en-AU",
                "count": 138
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchFacetBucket"
            }
          },
          "topics": {
            "description": "Buckets for the topics facet.",
            "example": [
              {
                "key": "Business Skills",
                "count": 43651
              },
              {
                "key": "Entrepreneurship",
                "count": 42141
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchFacetBucket"
            }
          },
          "duration": {
            "description": "Buckets for the duration facet.",
            "example": [
              {
                "key": "1.0-15.0",
                "from": 1,
                "to": 15,
                "count": 1393
              },
              {
                "key": "15.0-30.0",
                "from": 15,
                "to": 30,
                "count": 521
              },
              {
                "key": "30.0-60.0",
                "from": 30,
                "to": 60,
                "count": 576
              },
              {
                "key": "60.0-*",
                "from": 60,
                "count": 921
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchFacetBucket"
            }
          },
          "entry_level": {
            "description": "Buckets for the entry_level facet.",
            "example": [
              {
                "key": "Beginner",
                "count": 66
              },
              {
                "key": "Suitable for everyone",
                "count": 56
              },
              {
                "key": "Intermediate",
                "count": 46
              },
              {
                "key": "Advanced",
                "count": 30
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchFacetBucket"
            }
          }
        }
      },
      "ContentSearchHit": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "A new globally unique identifier for the learning object. The previous `id` and `lo_id` fields will become a `legacy_id` in future API versions.",
            "example": "con_01HBYXF3HYPTG5Q1RJ7BPFAF23"
          },
          "gc_lo_id": {
            "type": "string",
            "description": "The unique identifier for the learning object.",
            "example": "1234"
          },
          "updated_time": {
            "type": "string",
            "description": "The date and time when the learning object was last updated. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          },
          "created_time": {
            "type": "string",
            "description": "The date and time when the Learning Object was created. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          },
          "core": {
            "description": "The minimum core or essential information about the learning object, such as its title, description and image.",
            "allOf": [
              {
                "$ref": "#/components/schemas/CoreFragment"
              }
            ]
          },
          "lifecycle": {
            "description": "Information related to the various stages and statuses that the learning object may go through during its lifecycle.",
            "allOf": [
              {
                "$ref": "#/components/schemas/LifecycleFragment"
              }
            ]
          },
          "relevance": {
            "description": "Descriptive information to aid the consumer in understanding the relevance of this Learning Object for them.",
            "allOf": [
              {
                "$ref": "#/components/schemas/RelevanceFragment"
              }
            ]
          },
          "tags": {
            "description": "Descriptive tags associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/TagsFragment"
              }
            ]
          },
          "topics": {
            "description": "The topics associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/TopicsFragment"
              }
            ]
          },
          "pricing": {
            "description": "Information about the price and currency of the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PricingFragment"
              }
            ]
          },
          "skills": {
            "description": "The skills that relate to the Learning Object.",
            "example": [
              {
                "name": "Sketch (design software)",
                "confidence": 0.645941
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SkillFragmentItem"
            }
          },
          "provider": {
            "description": "Information related to the provider who created the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/ProviderFragment"
              }
            ]
          },
          "playback_behavior": {
            "description": "Information related to the playback behavior of this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PlaybackBehaviorFragment"
              }
            ]
          },
          "quality": {
            "description": "Quality fields associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/QualityFragment"
              }
            ]
          },
          "alternatives": {
            "description": "Alternative content to this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/AlternativesFragment"
              }
            ]
          },
          "preview": {
            "description": "Information that can be used to preview this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PreviewFragment"
              }
            ]
          },
          "images": {
            "description": "Images related to displaying the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/ImagesFragment"
              }
            ]
          },
          "revisions": {
            "description": "Information related to the language/version of this Learning Object, and relationships with other languages/versions.",
            "example": {
              "en": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                }
              ],
              "fr": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                }
              ],
              "de": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                },
                {
                  "version": "2.0",
                  "id": "con_456e78"
                }
              ]
            },
            "allOf": [
              {
                "$ref": "#/components/schemas/RevisionsFragment"
              }
            ]
          },
          "generated_metadata": {
            "type": "object",
            "description": "Metadata generated by go1 to be used as an alternative to user provided metadata fragments. Each property within this fragment mirrors the schema of the metadata fragment it aims to replace.",
            "example": {
              "generated_metadata": {
                "topics": {
                  "items": [
                    {
                      "id": 64,
                      "name": "Technology Skills"
                    },
                    {
                      "id": 17,
                      "name": "IT Software"
                    },
                    {
                      "id": 110,
                      "name": "Microsoft Products"
                    }
                  ]
                }
              }
            }
          }
        },
        "required": [
          "id",
          "updated_time",
          "created_time"
        ]
      },
      "LearningObjectsSearchQueryParamsPostProcessing": {
        "type": "object",
        "properties": {
          "keyword": {
            "type": "string",
            "description": "A string containing the keyword(s) searched with all detected filters removed.",
            "example": "'Leadership courses in English' would return 'Leadership'"
          },
          "params": {
            "type": "object",
            "description": "An object containing query parameters that have been automatically applied as a result of the user's search keyword."
          }
        }
      },
      "ContentSearch": {
        "type": "object",
        "properties": {
          "total": {
            "type": "number",
            "description": "The total number of retrievable results from the request.",
            "example": 1
          },
          "facets": {
            "description": "Collection of requested Learning Object facets.",
            "allOf": [
              {
                "$ref": "#/components/schemas/ContentSearchFacets"
              }
            ]
          },
          "hits": {
            "description": "An array containing the requested results.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContentSearchHit"
            }
          },
          "applied_filters": {
            "description": "This provides information about the filters that are automatically applied when the request includes a search keyword.",
            "allOf": [
              {
                "$ref": "#/components/schemas/LearningObjectsSearchQueryParamsPostProcessing"
              }
            ]
          },
          "next_scroll_id": {
            "type": "string",
            "description": "The scroll ID to pass to next scroll request. Only returned with `use_scroll=true` parameter."
          }
        }
      },
      "CoreImageRequest": {
        "type": "object",
        "properties": {
          "value": {
            "type": "string",
            "description": "Stores the actual media or a representation of the resource the media is referring to. For example, depending on the context the content of the value can be: \n- Direct Link: If the resource is externally hosted, 'value' can contain a URL or URI pointing to the location where the resource is accessible. \n- Raw Data: For resources that are self-contained or need to be stored within the object for immediate access, 'value' can hold the raw data directly. \n- Reference Identifier: In scenarios where the resource is part of a larger dataset or system, value can contain an identifier that uniquely points to the resource within that context.",
            "example": "https://example.com/images/course.jpg"
          }
        },
        "required": [
          "value"
        ]
      },
      "CreationCoreFragment": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "The learning object type. Enum: `audio`, `course`, `document`, `event`, `interactive`, `link`, `lti`, `text`, `video`.",
            "enum": [
              "course",
              "group",
              "playlist",
              "module",
              "assignment",
              "audio",
              "document",
              "event",
              "interactive",
              "manual",
              "link",
              "lti",
              "question",
              "quiz",
              "text",
              "video"
            ],
            "example": "course"
          },
          "title": {
            "type": "string",
            "description": "The title or name of the learning object.",
            "example": "Introduction to Programming"
          },
          "description": {
            "type": "string",
            "description": "A brief description or overview of the learning object.",
            "example": "Learn the basics of programming with this comprehensive course."
          },
          "image": {
            "description": "Contains data of the thumbnail image associated with the learning object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/CoreImageRequest"
              }
            ]
          },
          "external_id": {
            "type": "string",
            "default": "",
            "description": "An external source identifier from where the content originated.",
            "example": "course123"
          }
        },
        "required": [
          "type",
          "title",
          "description",
          "image"
        ]
      },
      "ContentCreationRequest": {
        "type": "object",
        "properties": {
          "core": {
            "description": "The minimum core or essential information about the learning object, such as its title, description and image.",
            "allOf": [
              {
                "$ref": "#/components/schemas/CreationCoreFragment"
              }
            ]
          }
        }
      },
      "ContentCreationResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "A new globally unique identifier for the learning object. The previous `id` and `lo_id` fields will become a `legacy_id` in future API versions.",
            "example": "con_01HBYXF3HYPTG5Q1RJ7BPFAF23"
          },
          "gc_lo_id": {
            "type": "string",
            "description": "The unique identifier for the learning object.",
            "example": "1234"
          },
          "updated_time": {
            "type": "string",
            "description": "The date and time when the learning object was last updated. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          },
          "created_time": {
            "type": "string",
            "description": "The date and time when the Learning Object was created. In [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), stored in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).",
            "example": "2023-05-19T05:13:30.827Z"
          },
          "core": {
            "description": "The minimum core or essential information about the learning object, such as its title, description and image.",
            "allOf": [
              {
                "$ref": "#/components/schemas/CoreFragment"
              }
            ]
          },
          "lifecycle": {
            "description": "Information related to the various stages and statuses that the learning object may go through during its lifecycle.",
            "allOf": [
              {
                "$ref": "#/components/schemas/LifecycleFragment"
              }
            ]
          },
          "relevance": {
            "description": "Descriptive information to aid the consumer in understanding the relevance of this Learning Object for them.",
            "allOf": [
              {
                "$ref": "#/components/schemas/RelevanceFragment"
              }
            ]
          }
        },
        "required": [
          "id",
          "updated_time",
          "created_time"
        ]
      },
      "UpdatingCoreFragment": {
        "type": "object",
        "properties": {
          "creators": {
            "description": "An array containing the User Account id's of the Go1 user(s) who created the Learning Object.",
            "example": [
              "usr_01HBYXG21DRXDQ6XBNMDJ8WTMH",
              "usr_01HBYXGCF2HYX5925YBKPMS4TA"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "type": {
            "type": "string",
            "description": "The learning object type. Enum: `audio`, `course`, `document`, `event`, `interactive`, `link`, `lti`, `text`, `video`.",
            "enum": [
              "course",
              "group",
              "playlist",
              "module",
              "assignment",
              "audio",
              "document",
              "event",
              "interactive",
              "manual",
              "link",
              "lti",
              "question",
              "quiz",
              "text",
              "video"
            ],
            "example": "course"
          },
          "title": {
            "type": "string",
            "description": "The title or name of the learning object.",
            "example": "Introduction to Programming"
          },
          "description": {
            "type": "string",
            "description": "A brief description or overview of the learning object.",
            "example": "Learn the basics of programming with this comprehensive course."
          },
          "external_id": {
            "type": "string",
            "description": "An external source identifier from where the content originated.",
            "example": "course123"
          },
          "image": {
            "description": "Contains data of the thumbnail image associated with the learning object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/CoreImageRequest"
              }
            ]
          }
        }
      },
      "UpdatingLifecycleFragment": {
        "type": "object",
        "properties": {
          "state": {
            "type": "string",
            "description": "The state of the content in coherence with the Go1 Content Lifecycle.",
            "example": "published",
            "enum": [
              "draft",
              "published",
              "retired",
              "removed"
            ]
          }
        }
      },
      "UpdatingRelevanceFragment": {
        "type": "object",
        "properties": {
          "duration": {
            "type": "number",
            "description": "The duration of the learning object in minutes.",
            "example": 180
          },
          "language": {
            "type": "string",
            "description": "The language in which the learning object is presented. ISO-639 language code format, with an optional ISO-3166 two character country code, separated by a hyphen. For example: 'en', 'en-US', 'en-GB, 'es'.",
            "example": "en"
          },
          "year_created": {
            "type": "number",
            "description": "The year in which the learning object was created.",
            "example": 2022
          },
          "summary": {
            "type": "string",
            "description": "A brief summary of the content. Max length: 120 characters.",
            "example": "This course provides an intro to programming concepts and techniques."
          },
          "entry_level": {
            "type": "string",
            "description": "Contains key-value pairs representing the entry level of the learning object.",
            "example": "Intermediate"
          },
          "learning_outcomes": {
            "description": "Intended learning outcomes or objectives that learners can expect to achieve upon completing the learning object.",
            "example": [
              "Understand the fundamental concepts of object-oriented programming",
              "Create classes and objects in Python"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "region": {
            "description": "Regions in which learning object is available for consumption. If set to `GLOBAL`, it can be consumed throughout the globe. \n\n Available regions mapped to their key: \n- `495 - GLOBAL`, `496 - AU`, `497 - US`, `498 - GB`, `499 - NZ`, `500 - MY`, `501 - ZA`, `515 - CA`, `516 - UAE`",
            "example": [
              "GLOBAL",
              "AU"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "locale": {
            "description": "The locale of the learning object. Values include: `en-AU`, `en-US`, `en-UK`.",
            "example": [
              "en-AU",
              "en-US"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "author": {
            "description": "",
            "allOf": [
              {
                "$ref": "#/components/schemas/RelevanceAuthorFragment"
              }
            ]
          },
          "who_should_consume": {
            "type": "string",
            "description": "Short description of the target audience for this content"
          }
        }
      },
      "UpdatingPlaybackBehaviorFragment": {
        "type": "object",
        "properties": {
          "launch_mode": {
            "type": "string",
            "description": "The launch mode of the Learning Object.",
            "example": "iframe"
          },
          "auto_complete": {
            "type": "boolean",
            "description": "The Learning Object will automatically mark itself as complete (if false - player will show 'mark as complete' button).",
            "example": true
          },
          "mobile_optimised": {
            "type": "boolean",
            "description": "The Learning Object can be played on a mobile device.",
            "example": true
          },
          "assessable": {
            "type": "boolean",
            "description": "The Learning Object contains assessable modules where the learner receives a score or feedback. (Includes any quizzes, assessments or knowledge checks)",
            "example": true
          },
          "wcag": {
            "type": "boolean",
            "description": "The Learning Object is compliant with WCAG 2.0A or equivalent standard.",
            "example": true
          }
        }
      },
      "UpdatingLinkProtectedFragment": {
        "type": "object",
        "properties": {
          "integration": {
            "type": "boolean",
            "nullable": true,
            "description": "Flag to indicate that the LO is integrated content."
          },
          "url": {
            "type": "string",
            "nullable": true,
            "description": "URL to consume the content."
          },
          "open_mode": {
            "type": "string",
            "nullable": true,
            "enum": [
              "iframe",
              "window",
              "dynamic"
            ],
            "description": "How the interactive should be opened, iframe inside iframe or window inside iframe."
          },
          "can_mark_as_complete": {
            "type": "boolean",
            "nullable": true,
            "description": "Whether or not a learning content can be marked as complete by a user without completing it."
          },
          "check_url": {
            "type": "string",
            "nullable": true,
            "description": "A URL that will be polled when the content is being consumed."
          },
          "authentication_type": {
            "type": "string",
            "nullable": true,
            "enum": [
              "saml",
              "none"
            ],
            "description": "Type of authentication used to get info about a learning content."
          }
        }
      },
      "UpdatingProtectedFragment": {
        "type": "object",
        "properties": {
          "value": {
            "description": "The value to set against the learning object's data field. Used for consumption and playback of the learning object. \n\n Must be one of the following values: \n- `URL`: A URL location for where the content file is hosted. For video, audio and document learning object types. Example: `\"value\": \"https://res.cloudinary.com/document-file.pdf\"`. \n\n- `lo_id[]`: An array of standalone learning object id’s to be attached to a module type learning object. Or a list of module learning object id’s to be attached to a course type learning object. Example: `\"value\": [\"36992663\", \"36992664\", \"01H6T22T0VB3WFXW4G888WY2SP\"]`.\n\n- `object`: An object of settings for a link type. Example: \n\n  `\"value\": {`\n  ` \"url\":\"https://example.com\",` \n  ` \"open_mode\":\"dynamic\",` \n  ` \"can_mark_as_complete\":\"true\",` \n  ` \"integration\":true,` \n  ` \"check_url\":\"https://example.com\",` \n  ` \"authentication_type\":\"saml\"`\n  `}`.",
            "example": "https://go1-video.amazonaws.com/video/video-file.mp4",
            "oneOf": [
              {
                "description": "URL to consume the video content.",
                "type": "string",
                "example": "https://youtube.com/1234",
                "nullable": false
              },
              {
                "description": "URL to consume the audio content.",
                "type": "string",
                "example": "https://go1-video.amazonaws.com/video/audio-file.mp3",
                "nullable": false
              },
              {
                "description": "URL to consume the document content.",
                "type": "string",
                "example": "https://res.cloudinary.com/raw/upload/document-file.pdf",
                "nullable": false
              },
              {
                "description": "URL of the interactive content.",
                "type": "string",
                "example": "https://s3.ap-southeast-2.amazonaws.com/s3.go1.service/go1.cloud/lo-editor/10057881/123456/scormfile.zip",
                "nullable": false
              },
              {
                "description": "List of standalone learning object content_id values to be attached to a module.",
                "type": "array",
                "example": [
                  36992659,
                  "36992660",
                  "01H6T11T0VB3WFXW4G888WY2SP"
                ],
                "nullable": false
              },
              {
                "description": "List of module content_id values to be attached to a course.",
                "type": "array",
                "example": [
                  36992663,
                  "36992664",
                  "01H6T22T0VB3WFXW4G888WY2SP"
                ],
                "nullable": false
              },
              {
                "$ref": "#/components/schemas/UpdatingLinkProtectedFragment"
              }
            ]
          }
        },
        "required": [
          "value"
        ]
      },
      "UpdatingTopicsFragment": {
        "type": "object",
        "properties": {
          "items": {
            "description": "The [topics](https://help.go1.com/en/articles/6767512-topics-taxonomy) associated with the learning object.",
            "example": [
              {
                "id": 64,
                "name": "Technology Skills"
              },
              {
                "id": 17,
                "name": "IT Software"
              },
              {
                "id": 110,
                "name": "Microsoft Products"
              }
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "MediaUpdateRequest": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "description": "A unique key for the media."
          },
          "value": {
            "type": "string",
            "description": "Stores the actual media or a representation of the resource the media is referring to. For example, depending on the context the content of the value can be: \n- Direct Link: If the resource is externally hosted, 'value' can contain a URL or URI pointing to the location where the resource is accessible. \n- Raw Data: For resources that are self-contained or need to be stored within the object for immediate access, 'value' can hold the raw data directly. \n- Reference Identifier: In scenarios where the resource is part of a larger dataset or system, value can contain an identifier that uniquely points to the resource within that context."
          }
        },
        "required": [
          "key",
          "value"
        ]
      },
      "UpdatingPreviewFragment": {
        "type": "object",
        "properties": {
          "media": {
            "description": "",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MediaUpdateRequest"
            }
          }
        }
      },
      "UpdatingImagesFragment": {
        "type": "object",
        "properties": {
          "media": {
            "description": "",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MediaUpdateRequest"
            }
          }
        }
      },
      "UpdatingTagsFragment": {
        "type": "object",
        "properties": {
          "items": {
            "description": "An array of descriptive tags associated with the Learning Object.",
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "UpdatingRevisionsFragment": {
        "type": "object",
        "properties": {
          "languages": {
            "description": "The language(s) in which the learning object is presented. ISO-639 language code format, with an optional ISO-3166 two character country code, separated by a hyphen. Applies to the learning object id in the request path by default, otherwise the language(s) is applied to the learning object 'id' within the payload",
            "example": [
              "en",
              "de",
              "vi-VN"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "id": {
            "type": "string",
            "description": "A new globally unique identifier for the Learning Object. The previous id and lo_id fields will become a legacy_id in future API versions. If provided the language(s) will be applied to this 'id' and associated to the same revisions as the learning object being set if it hasn't been already.",
            "example": "con_123e45"
          }
        },
        "required": [
          "languages"
        ]
      },
      "ContentUpdatingRequest": {
        "type": "object",
        "properties": {
          "core": {
            "description": "The minimum core or essential information about the learning object, such as its title, description and image.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingCoreFragment"
              }
            ]
          },
          "lifecycle": {
            "description": "Information related to the various stages and statuses that the learning object may go through during its lifecycle.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingLifecycleFragment"
              }
            ]
          },
          "relevance": {
            "description": "Descriptive information to aid the consumer in understanding the relevance of this Learning Object for them.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingRelevanceFragment"
              }
            ]
          },
          "playback_behavior": {
            "description": "Information related to the playback behavior of this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingPlaybackBehaviorFragment"
              }
            ]
          },
          "protected": {
            "description": "Information that allows Go1 to consume the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingProtectedFragment"
              }
            ]
          },
          "topics": {
            "description": "The topics associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingTopicsFragment"
              }
            ]
          },
          "preview": {
            "description": "Information that can be used to preview this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingPreviewFragment"
              }
            ]
          },
          "images": {
            "description": "Images related to displaying the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingImagesFragment"
              }
            ]
          },
          "tags": {
            "description": "Descriptive tags associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingTagsFragment"
              }
            ]
          },
          "revisions": {
            "description": "Information related to the language/version of this Learning Object, and relationships with other languages/versions.",
            "allOf": [
              {
                "$ref": "#/components/schemas/UpdatingRevisionsFragment"
              }
            ]
          }
        }
      },
      "ContentUpdatingResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "A new globally unique identifier for the learning object. The previous `id` and `lo_id` fields will become a `legacy_id` in future API versions.",
            "example": "con_01HBYXF3HYPTG5Q1RJ7BPFAF23"
          },
          "gc_lo_id": {
            "type": "string",
            "description": "The unique identifier for the learning object.",
            "example": "1234"
          },
          "core": {
            "description": "The minimum core or essential information about the learning object, such as its title, description and image.",
            "allOf": [
              {
                "$ref": "#/components/schemas/CoreFragment"
              }
            ]
          },
          "lifecycle": {
            "description": "Information related to the various stages and statuses that the learning object may go through during its lifecycle.",
            "allOf": [
              {
                "$ref": "#/components/schemas/LifecycleFragment"
              }
            ]
          },
          "relevance": {
            "description": "Descriptive information to aid the consumer in understanding the relevance of this Learning Object for them.",
            "allOf": [
              {
                "$ref": "#/components/schemas/RelevanceFragment"
              }
            ]
          },
          "tags": {
            "description": "Descriptive tags associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/TagsFragment"
              }
            ]
          },
          "topics": {
            "description": "The topics associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/TopicsFragment"
              }
            ]
          },
          "protected": {
            "description": "Information that allows Go1 to consume the Learning Object.",
            "oneOf": [
              {
                "type": "object",
                "$ref": "#/components/schemas/BaseProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/AudioProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/DocumentProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/InteractiveProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/LinkProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/LTIProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/QuestionProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/QuizProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/VideoProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/CourseProtectedFragment"
              },
              {
                "type": "object",
                "$ref": "#/components/schemas/ModuleProtectedFragment"
              }
            ]
          },
          "pricing": {
            "description": "Information about the price and currency of the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PricingFragment"
              }
            ]
          },
          "skills": {
            "description": "The skills that relate to the Learning Object.",
            "example": [
              {
                "name": "Sketch (design software)",
                "confidence": 0.645941
              }
            ],
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SkillFragmentItem"
            }
          },
          "provider": {
            "description": "Information related to the provider who created the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/ProviderFragment"
              }
            ]
          },
          "playback_behavior": {
            "description": "Information related to the playback behavior of this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PlaybackBehaviorFragment"
              }
            ]
          },
          "quality": {
            "description": "Quality fields associated with the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/QualityFragment"
              }
            ]
          },
          "alternatives": {
            "description": "Alternative content to this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/AlternativesFragment"
              }
            ]
          },
          "preview": {
            "description": "Information that can be used to preview this Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/PreviewFragment"
              }
            ]
          },
          "images": {
            "description": "Images related to displaying the Learning Object.",
            "allOf": [
              {
                "$ref": "#/components/schemas/ImagesFragment"
              }
            ]
          },
          "revisions": {
            "description": "Information related to the language/version of this Learning Object, and relationships with other languages/versions.",
            "example": {
              "en": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                }
              ],
              "fr": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                }
              ],
              "de": [
                {
                  "version": "1.0",
                  "id": "con_123e45"
                },
                {
                  "version": "2.0",
                  "id": "con_456e78"
                }
              ]
            },
            "allOf": [
              {
                "$ref": "#/components/schemas/RevisionsFragment"
              }
            ]
          }
        },
        "required": [
          "id"
        ]
      },
      "PremiumReviewGetResponse": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "description": "Status of your premium submission for a given piece of content.",
            "example": [
              "pending",
              "rejected",
              "approved"
            ],
            "enum": [
              "approved",
              "pending",
              "rejected"
            ]
          },
          "reasons": {
            "description": "Reasons of your premium submission status for a given piece of content.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "reasons_details": {
            "type": "string",
            "description": "Reasons details of your premium submission status for a given piece of content."
          }
        },
        "required": [
          "status"
        ]
      },
      "PremiumReviewPostResponse": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "description": "Status of your premium submission for a given piece of content.",
            "example": "pending"
          }
        },
        "required": [
          "status"
        ]
      },
      "BaseProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          }
        }
      },
      "AudioProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "media": {
            "description": "Contains the media data of the learning object.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Media"
            }
          }
        },
        "required": [
          "media"
        ]
      },
      "VideoProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "media": {
            "description": "Contains the media data of the learning object.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Media"
            }
          },
          "provider": {
            "type": "string",
            "enum": [
              "cloudinary",
              "other",
              "azure",
              "youtube",
              "vimeo"
            ],
            "description": "Source of the video.",
            "example": "youtube"
          }
        },
        "required": [
          "media",
          "provider"
        ]
      },
      "DocumentProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "media": {
            "description": "Contains the media data of the learning object.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Media"
            }
          }
        },
        "required": [
          "media"
        ]
      },
      "InteractiveProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "id": {
            "type": "string",
            "description": "Id of interactive",
            "example": "12345"
          },
          "status": {
            "type": "string",
            "enum": [
              "processing",
              "ready",
              "error"
            ],
            "description": "Status of the async job for the interactive import.",
            "example": "ready"
          },
          "error_message": {
            "type": "string",
            "description": "Error message of the async job for the interactive import.",
            "example": "Not found"
          }
        },
        "required": [
          "id",
          "status"
        ]
      },
      "LinkProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "media": {
            "description": "Contains the media data of the learning object.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Media"
            }
          },
          "open_mode": {
            "type": "string",
            "enum": [
              "iframe",
              "window",
              "dynamic"
            ],
            "description": "How the interactive should be opened, iframe inside iframe or window inside iframe.",
            "example": "iframe"
          },
          "integration": {
            "type": "boolean",
            "description": "Flag to indicate that the LO is integrated content.",
            "example": false
          },
          "check_url": {
            "type": "string",
            "description": "A URL that will be polled when the content is being consumed.",
            "example": "https://example.com/contentdata/12345"
          },
          "authentication_type": {
            "type": "string",
            "description": "Type of authentication used to get info about a learning content.",
            "enum": [
              "saml",
              "none"
            ],
            "example": "saml"
          }
        },
        "required": [
          "media",
          "open_mode",
          "integration"
        ]
      },
      "LTIProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "id": {
            "type": "string",
            "description": "Id of LTI.",
            "example": "12345"
          }
        },
        "required": [
          "id"
        ]
      },
      "QuizProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "id": {
            "type": "string",
            "description": "Id of quiz.",
            "example": "12345"
          }
        },
        "required": [
          "id"
        ]
      },
      "QuestionProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "id": {
            "type": "string",
            "description": "Id of question.",
            "example": "12345"
          }
        },
        "required": [
          "id"
        ]
      },
      "CourseProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "items": {
            "description": "Collection of Module type Learning Objects.",
            "example": [
              {
                "id": "123456",
                "content_id": "con_01HCBZ3C1R42418S86TCEC0KW0",
                "core": {
                  "authors": [
                    "usr_01HCBZ3HTRCAPNS27FA97NP4HE"
                  ],
                  "type": "module",
                  "title": "A module example",
                  "description": "An array containing the User Account id's of the Go1 user(s) who created the Learning Object.",
                  "provider_id": "123456"
                },
                "data": {
                  "items": [
                    {
                      "id": "2345",
                      "content_id": "con_01HCBZ6CZMF1KP0RAW82DS8VDS",
                      "core": {
                        "authors": [
                          "usr_01HCBZ6HBKETTA2YWGNWN90BSB"
                        ],
                        "type": "interactive",
                        "title": "An interactive example",
                        "description": "An array containing the User Account id's of the Go1 user(s) who created the Learning Object.",
                        "provider_id": "123456"
                      },
                      "data": {
                        "id": 345678,
                        "status": "ready"
                      }
                    },
                    {
                      "id": "3456",
                      "content_id": "con_01HCED0R71P3J6VHH1BGCD52AK",
                      "core": {
                        "authors": [
                          "usr_01HCED0WHGDPTNHWGGE7X80H69"
                        ],
                        "type": "video",
                        "title": "A video example",
                        "description": "An array containing the User Account id's of the Go1 user(s) who created the Learning Object.",
                        "provider_id": "123456"
                      },
                      "data": {
                        "id": 345678
                      }
                    }
                  ]
                }
              }
            ],
            "type": "array",
            "items": {
              "type": "object"
            }
          }
        },
        "required": [
          "items"
        ]
      },
      "ModuleProtectedFragment": {
        "type": "object",
        "properties": {
          "can_mark_as_complete": {
            "type": "boolean",
            "description": "Whether or not a learning content can be marked as complete by a user without completing it.",
            "example": true
          },
          "items": {
            "description": "Collection of standalone Learning Objects.",
            "example": [
              {
                "id": "2345",
                "content_id": "con_01HCBZ6CZMF1KP0RAW82DS8VDS",
                "core": {
                  "authors": [
                    "usr_01HCBZ6HBKETTA2YWGNWN90BSB"
                  ],
                  "type": "interactive",
                  "title": "An interactive example",
                  "description": "",
                  "provider_id": "123456"
                },
                "data": {
                  "id": 345678,
                  "status": "ready"
                }
              },
              {
                "id": "3456",
                "content_id": "con_01HCED0R71P3J6VHH1BGCD52AK",
                "core": {
                  "authors": [
                    "usr_01HCED0WHGDPTNHWGGE7X80H69"
                  ],
                  "type": "video",
                  "title": "A video example",
                  "description": "",
                  "provider_id": "123456"
                },
                "data": {
                  "id": 345678
                }
              }
            ],
            "type": "array",
            "items": {
              "type": "object"
            }
          }
        },
        "required": [
          "items"
        ]
      }
    }
  }
} as const
