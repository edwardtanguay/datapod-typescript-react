import * as config from '../config'
import { app } from './server'

app.listen(config.getPort(), () => {
	console.log(`API running at http://localhost:${config.getPort()}`);
})