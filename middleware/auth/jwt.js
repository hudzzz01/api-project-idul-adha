import jwt from "jsonwebtoken"

class Token{
    static createToken (userData){
        return jwt.sign({
            data: userData
          }, 'himitsu', { expiresIn: '1h' });
    }

    static async decodeToken(token){
        try {
            let decoded = jwt.verify(token, 'himitsu');
            //console.log(decoded)
            return decoded

        } catch(err) {
            // err
        }

        

        
    }
}

export default Token