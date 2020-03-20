# Software Studio 2019 Spring Midterm Project
## Notice
* Replace all [xxxx] to your answer

## Topic
* Project Name : Chatroom
* Key functions (add/delete)
    1. One-on-one chat
    2. Lobby chat
    3. Load messages history
    4. Chat with new user
    5. Message content
* Other functions (add/delete)
    1. Reset password

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|20%|Y|
|Firebase Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|15%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|Y|

## Website Detail Description

# 作品網址：
https://software-studio-midterm.firebaseapp.com/index.html

# Components Description : 
1. one-on-one chat
    >使用者登入之後，可以搜尋別人的Email進行一對一聊天，如果搜尋不到該使用者，會跳出aler警告。
2. lobby chat
    >使用者登入之後，可以進到大廳，跟所有人聊天。
3. Load message history : 
    > 進入聊天室後，會顯示之前所有的聊天記錄。當該聊天室內的任何一人傳送新訊息，聊天記錄都會即時更新。

4. Chat with new user : 
    >如果知道用戶的Email，可以透過上方的搜尋欄，來與該用戶聊天。
5. Message content : 
    >每則訊息會顯示傳送者是誰、內容、以及傳送的時間，當有新訊息時，也會自動捲到底部。
# Other Functions Description(1~10%) : 
1. Reset password
    >當使用者填入自己的Email之後，會寄出一封重設密碼的信到使用者的信箱，使用者可以藉由信內的連結來重設密碼。
## Security Report (Optional)
1. 在DB中主要分成Messages跟Users
2. Users為記錄所有使用者的地方，在Users下，只要是有登入的用戶，都能read資料，但只有該用戶才能寫入自己的內容
3. Messages為記錄聊天室的地方，除了Lobby之外，其他的聊天室會紀錄聊天室的使用者是誰，在聊天室底下的mes是只有聊天室中的兩個User才能read跟write

