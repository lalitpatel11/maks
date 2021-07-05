// const BASE_URL = 'https://www.niletechinnovations.com/projects/maks/api/'
const BASE_URL = 'https://admin.makstaxapp.com/api/'

// EndPoint List
export const register='register'
export const login='login'
export const resetPassword='reset-password'
export const forgotPassword='forgot-password'

export const book_appointment='book-appointment'
export const appointment_list='appointment-list'
export const upload_attachment='upload-attachment'
export const get_tax_advisory='get-tax-advisory'
export const submit_tax_advisory='submit-tax-advisery'
export const upload_reply_attachment='upload-attachment-reply'

export const get_profile='get-profile'
export const logout='logout'
export const update_profile='update-profile'
export const change_password='change-password'
export const getTaxTypes='get-tax-advisory'

export const get_subscription_popup_status="get-subscription-popup-status";

export const subscription_plan='subscription-plan'
export const current_subscription="current-subscription"
export const buy_subscription='buy-subscription'
export const execute_subscription_payment='execute-subscription-payment'
export const getAttachmentList = 'get-upload-attachment'
export const executeAppointmentPayment = 'execute-appointment-payment'
export const getAppointmentUrl = 'video-call/'
export const executeSubscriptionPayment = 'execute-subscription-payment'
export const checkStatus = 'auth/check_status'
export const supportDoc = 'support-doc'

export const requestPostApi = async (endPoint,body,method,token) => 
{
  var header = {}
 
  if(token!='' && token!=undefined)
  {
    header = {'Content-type': 'application/json','Authorization':'Bearer '+token,'Cache-Control': 'no-cache'
  }
  }else{
    header = { 'Content-type': 'application/json' , 'Cache-Control': 'no-cache'}
  }

  var url = BASE_URL + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(body + '\n')
  console.log(header + '\n')

  try {
      let response = await fetch(url, {
        method: method,
        body:JSON.stringify(body),
        headers:header,
      }
      )

      let code = await response.status
      console.log(code)   

      if(code==200){
        let responseJson = await response.json();
        console.log( responseJson)
        return {responseJson:responseJson,err:null}
      }else if(code == 400 || code == 402)
      {
        let responseJson = await response.json();
        //Completion block 
        return {responseJson:null,err:responseJson.message}
      }else{
        return {responseJson:null,err:'Something went wrong!'}
      }
    } catch (error) {
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
      console.error(error);
    }
  }



export const getRequestApi = async (endPoint, body, token) => {
  var header = {};
  var url = BASE_URL + endPoint;

  header = {
    'Content-type': 'application/json', 
    'Cache-Control': 'no-cache',
    'Authorization':`Bearer ${token}`
  };
  console.log('Request token:-' + token + '\n');

  // url = url + objToQueryString(body);
  console.log('Request Url:-' + url + '\n');

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: header,
    });

    let code = await response.status;
    console.log(code);

    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson);
      return {responseJson: responseJson, err: null, code: code};
    } else if (code == 400) {
      let responseJson = await response.json();
      return {responseJson: null, err: responseJson.message, code: code};
    } else {
      return {responseJson: null, err: 'Something went wrong!', code: code};
    }
  } catch (error) {
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
      code: 500,
    };
    console.error(error);
  }
};

export const postRequestApi = async(endPoint,formData)=>{
const header = {
  'Content-type': 'multipart/form-data'
}
const url = BASE_URL+endPoint

console.log('Requested URL :-',url)
console.log('Formdata from front to Server :-',formData+'/n')

try {
  
  const response = await fetch(url,{
    method:'POST',
    headers:header,
    body:formData
  })


const code = await response.status
console.log("Code",code)

if(code ==200){
  
  const responseJson = await response.json()
  console.log('data from backend', responseJson);
return {responseJson:responseJson,err:null}
} else if(code ==400){
  const responseJson = await response.json()
  return {responseJson:null,err:responseJson.message}
}else {
  return {responseJson: null, err: 'Something went wrong!'};
}


} catch (error) {
  return {
    responseJson: null,
    err: 'Something Went Wrong! Please check your internet connection.',
  };
}


}



export const postRequestMediaApi = async(endPoint,formData,token)=>{
  const header = {
    'Content-type': 'multipart/form-data',
    //'Accept': 'application/json',
    'Authorization':`Bearer ${token}`
  }
  const url = BASE_URL+endPoint
  
  console.log('Requested URL :-',url)
  console.log('Formdata from front to Server :-',formData+'/n')
  
  try {
    
    const response = await fetch(url,{
      method:'POST',
      headers:header,
      body:formData
    })

  const code = await response.status
  console.log("Code",code)
  
  if(code == 200){
    
    const responseJson = await response.json()
    console.log('data from backend', responseJson);
  return {responseJson:responseJson,err:null}
  } else if(code ==400){
    const responseJson = await response.json()
    return {responseJson:null,err:responseJson.message}
  }else {
    return {responseJson: null, err: 'Something went wrong!'};
  }
  
  } catch (error) {
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
    };
  }  
  }

  export const requestPostApiMedia = async (endPoint,formData,method,token) => 
  {
    var header = {}
   
    if(token!='' && token!=undefined)
    {
      header = {'Authorization':'Bearer '+token,'Cache-Control': 'no-cache'
    }
    }else{
      if(endPoint != signUpApi){
        header = {'Cache-Control': 'no-cache'
      }
    }
    }
  
    var url = BASE_URL + endPoint
    console.log('Request Url:-' + url + '\n')
    console.log(formData + '\n')
  
    try {
        let response = await fetch(url, {
          method: method,
          body:formData,
          headers:header,
         
        }
        )
  
        let code = await response.status
        console.log(code)   
  
        if(code==200){
          let responseJson = await response.json();
          console.log( responseJson)
          return {responseJson:responseJson,err:null}
        }else if(code == 400)
        {
          let responseJson = await response.json();
          return {responseJson:null,err:responseJson.message}
  
        }else{
  
          return {responseJson:null,err:'Something went wrong!'}
        }
      } catch (error) {
  
        return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
        console.error(error);
      }
    }
  

  const objToQueryString = (obj) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
  };
  