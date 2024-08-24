const client = require("./utils/redisClient");
const processJob = require("./utils/jobProcessor");

const myqueue = process.env.REDIS_QUEUE;

async function pullFromQueue() {
  client.blpop(myqueue, 0, async (err, data) => {
    try {
      if (err) {
        console.error("Error pulling from queue:", err);
        return;
      }

      const jobData = JSON.parse(data[1]);
    } catch (err) {}

    await processJob(jobData);

    pullFromQueue();
  });
}

pullFromQueue();
