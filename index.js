const ffmpeg = require('ffmpeg')
const fs = require('fs')

const main = async () => {
    try {
        let files = await fs.readdirSync('./gifs')

        console.log(files)

        for (const file of files) {
            const contents = await gifToWebm(file)
            console.log(contents)
        }

        console.log('conversion finalizada')
    } catch (error) {
        console.log(error)
    }
}

main()

const gifToWebm = (fileName) => {
    try {
        return new Promise(resolve=>{
            let process = new ffmpeg(`./gifs/${fileName}`)

            process.then(function (video) {
                video.setVideoFormat('webm')
                .save(`./webms/${fileName.replace('gif', 'webm')}`, function(error, file) {
                    if (!error) resolve(`Video file: ${file}`)
                })
            }, function (err) {
                console.log('Error: ' + err)
            })
        })
    } catch (e) {
        console.log(e.code)
        console.log(e.msg)
    }
}