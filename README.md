# Server-Pooling-Challenge

1. When a user sends a request to `http://localhost:6969/blocking-get?key=tahsin`, the browser will remain unresponsive for `40` seconds, or until data associated with the specified `key` becomes available.
2. If no data is linked to the key `tahsin` within `40` seconds, the server will send back `null`.
3. In the event that data for the `key` `tahsin` becomes available before the `40` second mark, the server will promptly return this data to the browser without any additional delay.
4. To send JSON data to the server, a `POST` request should be made to `http://localhost:6969/push?key=tahsin`.
5. The `key` parameter can be set to any desired value.
6. In scenarios where multiple browsers are monitoring the same `key`, and only one piece of data for that `key` is sent to the server, a single browser will receive the data. The others will continue waiting for additional data or will time out and receive a `null` response.