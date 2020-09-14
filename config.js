
const config = {
    // Login info
    username: "",
    password: "",

    headless: false, // recommended to be false => [false = Show chrome | true = hide chrome]
    
    urls: [
        "https://ilias.hs-heilbronn.de/goto.php?target=crs_8240&client_id=iliashhn",    // Foto Kurs
        "https://ilias.hs-heilbronn.de/goto.php?target=crs_189555&client_id=iliashhn"   // Video Kurs
    ]
}

module.exports = config;