var mysql=require('mysql')

var _db
var _config

var handleDisconnect = () => {
	_db=mysql.createConnection({ host:_config.host,user:_config.user,password:_config.password,database:_config.database })
	_db.connect(err => { if(err){ console.log('error when connecting to db: ',err); setTimeout(handleDisconnect,2000) } })
	_db.on('error',function(err){
		console.log('db error', err)
		if(err.code === 'PROTOCOL_CONNECTION_LOST') handleDisconnect()
		else throw err
	})
}

exports.init = (config) => {
	_config = { host: config.host, user: config.user, password: config.password, database: config.database }
	handleDisconnect()
}

exports.mysqlCtrl = () => _db