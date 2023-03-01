import Snowflake from 'twitter-snowflake';

const snowflake = Snowflake({ epoch: 1288834974657 });
const id = snowflake.generate();

console.log(id);
