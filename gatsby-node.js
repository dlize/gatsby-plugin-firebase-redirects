const fs = require("fs-extra");
const path = require("path");

exports.onPostBuild = ({ store }) => {

    // Only run if we're in a firebase build context
    if (!process.env.IS_FIREBASE_BUILD) return;

    const { redirects, program } = store.getState();

    // The path where we want to write the file `./firebase.json`
    const firebaseConfigPath = path.join(program.directory, "./firebase.json");

    // Return a promise chain
    return (
        fs
            .readFile(firebaseConfigPath)
            .then((data) => {
                const firebaseConfig = JSON.parse(data)
                if (!firebaseConfig.hosting.redirects)
                    firebaseConfig.hosting.redirects = []
                redirects.map(r => {
                    firebaseConfig.hosting.redirects.push({
                        source: r.fromPath,
                        destination: r.toPath,
                        type: r.isPermanent ? 301 : 302
                    })
                })
                fs.writeFile(firebaseConfigPath, JSON.stringify(firebaseConfig));
            })
            .catch(e => {
                // Log any errors thrown, e.g. the file doesn't exist
                console.error("onPostBuild error #hq0Kxa", JSON.stringify(e));
            })
    );
};
