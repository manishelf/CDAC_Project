## Requirements
    - register
    - add template
    - send mail
    // noreply.parkngo@gmail.com
    // ParkNGo0.0


-- register
    1. get
        email password clientName
        response - ok + identifying token
    // done without verification encrypt jwt token

-- set template
    1. post
    token templateName template keys
    // done

-- send mail
    1. post 
        email recipient token templateName values
    // 2. add queue no need as node js is asyncronous

-- get all sent mails

-- get mails log
    //done

-- get all templates
    // done
