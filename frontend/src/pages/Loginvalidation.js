function validation(values)
{//checks mail,password according to below automata
    let error={}
    const mail_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /.*/;


    if(values.mail === "")
    {
        error.mail="Enter a mail id" //if mail is empty asks to enter 
    }
    else if(!mail_pattern.test(values.mail))
    {
        error.mail="mail id didnt match"// input != to mail_pattern 
    }
    else{
        error.mail=""
    }

    if(values.password === "")
    {
        error.password="Enter password"
    }
    else if(!password_pattern.test(values.password))
    {
        error.password="Renter password"
    }
    else{
        error.password=""
    }
    return error;
}
    export default validation;