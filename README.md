## Buildit Weather App

https://github.com/buildit/org-design/blob/master/Recruitment/Exercises/js_engineer.md
    
### Production mode

Production mode serves static files.

1. Obtain an `OPEN_WEATHER_APP_ID` from [OpenWeatherMap](http://openweathermap.org/appid#get)

2. Set up your environment:

    ```
    export NODE_ENV=production
    export OPEN_WEATHER_APP_ID={OPEN_WEATHER_APP_ID}
    ```
    
3. Build the static assets:

    `npm run build`
    
4. Start the server:

    `npm start`
    
5. Visit `http://localhost:6060` in a web browser.
    
### Development mode

Development mode serves files directly from memory using `webpack-dev-middleware` and rebuilds when a file is changed.

1. Obtain an `OPEN_WEATHER_APP_ID` from [OpenWeatherMap](http://openweathermap.org/appid#get)

2. Setup your development environment:

    ```
    export NODE_ENV=development
    export OPEN_WEATHER_APP_ID={OPEN_WEATHER_APP_ID}
    export WEBPACK_DEV_SERVER=true
    ```

    > NOTE: Alternatively you can define an `.env` file -- try `cp ./server/_env ./server/.env`, then add your `OPEN_WEATHER_APP_ID` to `.env`.

4. Start the server:

    `npm start`

5. Visit `http://localhost:6060` in a web browser.

### Improvements

#### UX
1. Add weather condition icons.

2. Render more weather data in the Hour component, i.e. precip, wind speed etc.

3. Include the location in the UI. Perhaps provide UI to change the location -- it's currently hard coded to London.

4. Offer the ability to retry the API call when it fails as right now it's a dead end and requires a full browser refresh.

5. Add hover and active state to Days component.

#### Tech
1. Write unit tests. I'm a big fan of [Jest](http://github.com/facebook/jest) for few reasons:
    - It's one of the only scalable test runners as it's capable of only running tests that have potentially been effected by a code change.
    - It isolates tests from one another making it impossible to accidentally depend on global state defined by other tests.
    - It provides a nice module mocking feature meaning you have control over exactly which code you're exercising.

2. Provide a 'selector' API to access state. There are at least two reasons why this would be a good idea:
    - Right now many parts of the application including action creators, container components and the store itself are all coupled with the state shape which would make it hard to re-factor should it need to change.
	- A lot of the UI data is consciously not maintained as state in the store but is instead derived from the state in the `connect`ed Weather component. The current implementation means for every change the derived state is re-computed and `shouldComponentUpdate` as defined by `connect` is invalidated unnecessarily. If we were to implement a 'selector' API then we could utilize memoization to prevent this.

3. Define React PropTypes to enhance debugging.

4. Use CSS variables for colours etc.

5. More related to the [boilerplate](http://github.com/60frames/react-boilerplate) but I think the difference between client side and server side environment variables is a little confusing.
    - Currently server side env vars are defined as you might expect in many applications, i.e. Unix env vars
    - However, client side env vars are defined by a single Unix env var referencing a `.json` file in `./src/env` (`CLIENT_ENV`)
    - This distinction was initially made for two reasons:
        - It would prevent any risk of accidentally leaking server side env vars into the client bundle.
        - It meant the env vars could be checked into the repo (as, by definition they're public), so they become self documenting and each environment can be easily replicated locally.
    - Perhaps a convention whereby only Unix env vars beginning with `CLIENT_` are passed into the client side build would be better.


