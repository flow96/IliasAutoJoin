
const config = {
    // Login info
    username: "",
    password: "",

    headless: false, // recommended to be false => [false = Show chrome | true = hide chrome]
    
    urls: [
        "https://ilias.hs-heilbronn.de/goto.php?target=crs_8240&client_id=iliashhn",
        "https://ilias.hs-heilbronn.de/ilias.php?ref_id=11875&cmdClass=ilinfoscreengui&cmd=showSummary&cmdNode=v8:kn:dx&baseClass=ilrepositorygui"
    ],
    acceptanceText: ""
}

module.exports = config;