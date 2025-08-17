# Weather System Agent

OpenWeatherMap

expression

```text
if asked for the time or need to provide any time information, the current date and time of the server is {{ $now }}, but the user time is assumed to be in the New York Timezone, EST or -14400, the timezone field in the json, use the time in the json as the user's time, but just give that information, not the reasoning. also if they ask for the time, assume the time in new york, unless they asked for weather in any other zip code, privide the time related to the latest pull of the json for that zip code
```