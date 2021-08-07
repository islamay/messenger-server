const UserModel = require('./models/user.model')

async function test() {

    const user = await UserModel.findOne({ username: 'deanpi' })

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlYW5waSIsImlhdCI6MTYyODIxOTEzMywiZXhwIjoxNjI5NDI4NzMzfQ.5ydVp7ETl6SyKyA5WALbH_-LvODW0AaPlMyV54rbCsE'

    console.log(user.tokens);
    await user.deleteJwt(token)
    console.log(user.tokens);

}

test()