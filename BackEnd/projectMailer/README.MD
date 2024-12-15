## Requirements
    - register
    - add template
    - send mail
    // noreply.parkngo@gmail.com
    // ParkNGo0.0
    // phone - manish
## Additional
	- make asyncronous - pending
        -- asyncronous by using a callback url
	- implement mailing queue - pending

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
    // 2. add queue 

-- get mails log
    //done

-- get all templates
    // done


--- to do 
    - clean up 
    - encrypt the jwt
    - test 
	//done 
    - write unit test
        - template
        - register
        - mail
		-- pending

Consider using a message queue for email sending
    -- can be done using bull but not necessary
Implement caching for mail templates
    -- done