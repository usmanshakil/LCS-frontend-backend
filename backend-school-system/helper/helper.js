module.exports = {
    getUserRole: (role_id)=>{
        switch(role_id){
            case 1:
                return "Super Admin"
            case 2:
                return "Admin"
            case 3:
                return "Parent"
            case 4:
                return "Teacher"
            default:
                return ''
        }
    }
}