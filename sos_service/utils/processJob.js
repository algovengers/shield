
module.exports = async function processJob(data) {
    console.log('Processing job with data:', data);
    await someAsyncTask(data);
};

async function someAsyncTask(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Async task completed with data:', data);
            resolve();
        }, 1000);
    });
}
