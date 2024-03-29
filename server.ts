import express from 'express';
import cors from 'cors'
const app = express();
const PORT = 2000;

import router from './Router/index';

app.use(cors());
app.use(express.json());

// Parse JSON in request body
// app.use(express.urlencoded({extended : false}));


// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript and Express!');
// });
app.use("/api", router)
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
  console.log(`Server is ready ${PORT}`);
});
