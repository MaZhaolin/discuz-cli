import ora from 'ora';

export const loading = async (fn, msg, ...args) => {
    let count = 0;
    const run = async () => {
        const spinner = ora(msg);
        spinner.start();
        try {
            const result = await fn(...args);
            spinner.succeed();
            return result;
        } catch (err) {
            console.log(err);
            spinner.fail('something wrong, retry...');
            if (++count < 3) {
                return run();
            } else {
                return Promise.reject(err);
            }
        }
    }
    return run();
}