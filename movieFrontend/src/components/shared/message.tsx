export function Message({
    message,
    user,
  }: {
    message: string;
    user: string;
  }) {
  
    if(user == "me"){
      return(
        <div className="self-end mr-5 pb-2">
          {message} from {user}
        </div>
      )
    }else{
      return(
        <div className="self-start ml-5 pb-2">
          {message} from {user}
        </div>
      )
    }
  }

//Cine-match