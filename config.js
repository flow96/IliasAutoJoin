
const config = {
    // Login info
    username: "",
    password: "",

    headless: false, // recommended to be false => [false = Show chrome | true = hide chrome]
    
    urls: [
        "https://ilias.hs-heilbronn.de/goto.php?target=crs_8258&client_id=iliashhn"
    ]
}

module.exports = config;