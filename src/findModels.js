const findModels = (array) => {
    console.log('fired')
    let hybrids = ["HYBR'D", 'HYBRID', 'HYBR', "YBR'D", 'YBRID']
    let primes = ["PRIME", "PR'ME"]
    let results = []

    let possibleModels = {
        '4Runner': ['4RUN', 'NNER', '4RUNNER','ARUN','ARUNNER', 'YRUNNER', 'YRUN' ],
        bZ4X: ['bZ4X', 'bz4x', 'bZ4x', 'bZ4X', 'bz4x', 'bZ4x', 'bZ4X', 'bz4x', 'bZ4x'],
        Camry: ['CAMRY', 'CAMR', 'AMRY'],
        Corolla: ['CORO', 'OLLA', 'C0ROLLA', 'COROLLA', 'LLA'], 
        Crown: ['CROWN'],
        Rav4: ['RAV4', 'RAVA', 'RAVY'],
        Prius: ['PRIUS', "PR'US"],
        Sienna: ['SIENNA', "S'ENNA", "IENNA", "'ENNA"],
        Tundra: ['TUNDRA', 'TUNDR', 'TUN'],
        Tacoma: ['TACOMA'],
        Sequoia: ["SEQUO'A", 'SEQUOIA'],
        Highlander: ['HIGHL', 'LANDER', 'HIGHLANDER', "H'GHLANDER", "H'GHL"],
        Venza: ['VENZA'],
        }

   
    array.forEach(string => {
        let result = '🚨Model Unknown🚨'
        //determine if string contains possible matches in the Possible Models Object 
        for (let vehicle in possibleModels) {
            let possibleSpellings = possibleModels[vehicle]
            for (let i = 0; i < possibleSpellings.length; i++) {
                if (string.includes(possibleSpellings[i])) {
                    result = vehicle
                    break
                }
            } 
        }
        //Determine if Vehicle is Hybrid
        let isHybrid = false 
        let isPrime = false
        for (let i = 0; i < hybrids.length; i++) {
            if (string.includes(hybrids[i])) isHybrid = true
        }
        for (let i = 0; i < primes.length; i++) {
            if (string.includes(primes[i])) isPrime = true
        }

        //is vehicle Corolla? Also need to check for 'Cross'
       isHybrid ? results.push(`${result} Hybrid`) : isPrime ? results.push(`${result} Prime`) : results.push(result)
    }) 

    return results
}


export default findModels 