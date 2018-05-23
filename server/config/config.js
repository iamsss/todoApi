var env = process.env.NODE_ENV || 'development';

console.log('Our Environment is ', env);

if(env === 'development'){
    process.env.PORT = '3000';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/Todos';
}else if(env ==='test'){
    process.env.PORT = '3000';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodosTest';
    
}else{
    process.env.MONGODB_URI = 'mongodb://saurav9760:sfb604#Saurav@ds231460.mlab.com:31460/todoapi';
    
}
