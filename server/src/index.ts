import { app } from './app';
import { config } from './config';

const port = config.api.port;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});