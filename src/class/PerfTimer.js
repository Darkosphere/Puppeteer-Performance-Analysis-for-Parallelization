/**
 * Description of Class PerfTimer
 * 
 * this class allow to create objects 
 * that can be used through their methods to measure execution time
 * in a more straightforward way 
 */
 class PerfTimer {
    #startTime;
    #endTime;

    // CONSTRUCTOR
    constructor() {
        this.#startTime = performance.now();
        this.#endTime = undefined;
    }

    // FUNCTIONS
    /**
     * ```
     * PerfTimer.reset()
     * ```
     * - resets a PerfTimer object, by reaffecting the following values for its private properties:
     *   - `#startTime`: current time at function call (in ms)
     *   - `#endTime`: undefined
     */
    reset = () => {
        this.#startTime = performance.now();
        this.#endTime = undefined;
    }
    /**
     * ```
     * PerfTimer.stop() 
     * ```
     * - stops the actual PerfTimer object, 
     * by affecting the current time (in ms) to the private property `#endTime`
     * 
     * _use `performance.now()`_
     */
    stop = () => this.#endTime = performance.now();
    /**
     * ```
     * PerfTimer.resume()
     * ```
     * - resume the actual PerfTimer object,
     * by unsetting the value of the private property `#endTime`
     * which may have been set with a previous `PerfTimer.stop()` call.
     * 
     */
    resume = () => this.#endTime = undefined;
    /**
     * ```
     * PerfTimer.elapsedTime(unit = 'auto', returnNumber = false)
     * ```
     * - returns the elapsed time since the PerfTimer object creation or it's last reset.
     * - 1st argument allows to change the unit of the returned value.
     * - 2nd argument allows to select the type of the returned value between `Number` or `String` \
     * this will only work when `unit` value equals `"ms"` or `"s"`
     * 
     * **-- Arguments :**
     * @param {'auto' | 'ms' | 's'} unit a `string` that allows to specify the **unit** of the returned value \
     * accepted options are : 
     * - `"auto"` **[default value]**
     * - `"ms"`
     * - `"s"`
     * @param {boolean} returnNumber a `boolean` that allows to specify the **type** of the returned value between `string` or `number`, \
     * note that it **only works** if `unit` value is different from `"auto"` otherwise it will always return a `string`
     * - `true` returned value will be a `number` 
     * - `false` returned value will be a `string` **[default value]**
     * 
     * **-- Return Value :** 
     * @returns {string | number} `string` or `number`  
     * - `string` : \
     * when `unit == "auto"` or if `returnNumber == false` 
     * 
     * - `number`: \
     * when `unit != "auto"` **and** `returnNumber == true`
     */
    elapsedTime = (unit = 'auto', returnNumber = false) => {

        let elapsedTime; // will receive the elapsed time in ms (!! not rounded !!)

        if (this.#endTime == undefined) {
            let endTime = performance.now();
            elapsedTime = endTime - this.#startTime;
        } else {
            elapsedTime = this.#endTime - this.#startTime;
        }


        if (unit == 'ms') { // if unit is "ms" will return the exact value of execution time in ms
            if (returnNumber == false)
                return elapsedTime + ' ms';

            else if (returnNumber == true)
                return elapsedTime;
            
        } else
        if (unit == 's') {
            if (returnNumber == false)
                return ( Math.round(elapsedTime) / 1000 ) + ' s';

            else if (true)
                return ( Math.round(elapsedTime) / 1000 ); // returns the ms value (rounded) divided by 1000

        } else
        if (unit == 'auto') {
            return sToDHMS( Math.round( Math.round(elapsedTime) / 1000 ) );
        }

        
    }

} // END OF PerfTimer

/**
 * ```
 * function sToDHMS(seconds) { ... }
 * ```
 * - return a string which represent the provided time in `seconds` in a more readable way, \
 * goes up to **days** ranging from **seconds**. 
 * - returned format vary upon the `time` value, defined formats are : 
 *   - `'X+ days, XXh XXm XXs'`
 *   - `'XXh XXm XXs'`
 *   - `'XXm XXs'`
 *   - `'XXs'`
 * 
 *   _**note :** there are no filling `0` so sometimes a `XX` may result in a `X`_ 
 * 
 * **-- Argument :**
 * @param {number} seconds `number` in seconds 
 * 
 * **-- Return Value :** 
 * @returns {string} `string` format will vary upon the provided `seconds` value
 * - **_days_**  (`seconds >= 86400`) : \
 * returned string format is `'X+ days, XXh XXm XXs'` 
 * - **_hours_** (`seconds >= 3600`) : \
 * returned string format is `'XXh XXm XXs'`
 * - **_minutes_** (`seconds >= 60`) : \
 * returned string format is `'XXm XXs'`
 * - **_seconds_** (`seconds < 60`) : \
 * returned string format is `'XXs'`
 */
function sToDHMS(seconds) {  

    if (seconds >= 86400) { // days detected

        let d = Math.floor( seconds / 86400 ), // days
            h = Math.floor( ( seconds % 86400 ) / 3600 ), // hours 
            m = Math.floor( (( seconds % 86400 ) % 3600 ) / 60 ), // minutes
            s = (( seconds % 86400 ) % 3600 ) % 60; // seconds

        if (d == 1) 
            return `${d} day, ${h}h ${m}m ${s}s`;
        else 
            return `${d} days, ${h}h ${m}m ${s}s`;

    } else
    if (seconds >= 3600) { // hours detected

        let h = Math.floor( seconds / 3600 ), // hours
            m = Math.floor( ( seconds % 3600 ) / 60 ), // minutes
            s = ( seconds % 3600 ) % 60; // seconds

        return `${h}h ${m}m ${s}s`;

    } else 
    if (seconds >= 60) { // minutes detected

        let m = Math.floor( seconds / 60 ), // minutes 
            s = seconds % 60; // seconds

        return `${m}m ${s}s`;
        
    } else 
    if (seconds < 60) { // only seconds
        return `${seconds}s`;
    }

} //

module.exports = {
    PerfTimer
};
