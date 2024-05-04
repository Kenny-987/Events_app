import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../authContext'

const Portfolio = ({organizerDetails,getProfileData}) => {
  const { data} = useAuth();
  const {token} = data
  const [inputImages,setImages]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [loadingIndex, setLoadingIndex] = useState(null);
const {portfolio}=organizerDetails

useEffect(()=>{
  getProfileData()
},[])
  // function to add images to array
const handleAddImage = (e)=>{
const selectedImages = Array.from(e.target.files)
setImages(selectedImages)
}

// function to submit images to the server
const handleSubmit = async(e)=>{
  //.preventDefault()
  setIsLoading(true)
const formData = new FormData()

  try {
    for( let i =0;i<inputImages.length;i++){
  formData.append("images",inputImages[i])
}
    const response = await fetch("https://events-server-2d4h.onrender.com/auth/portfolio",{
      method: "POST", 
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:formData,
    })
    if(response.ok){
      setImages([])
      setIsLoading(false)
     await getProfileData()
    }else{
      console.log("error");
      setIsLoading(false)
      setImages([])
    }
  } catch (error) {
    console.log(error);
    setImages([])
    setIsLoading(false)
  }finally{
    setImages([])
    setIsLoading(false)
  }

}


//function to delete a portfolio image from server
const deleteImage = async(indexToRemove,img)=>{
  setLoadingIndex(indexToRemove);
  try {
    const response = await fetch(`https://events-server-2d4h.onrender.com/auth/delportfolioimg/${indexToRemove}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({img})
    });

    if (response.ok) {
      getProfileData()
       setLoadingIndex(null)
      
    } else {
        console.error("Failed to delete image item");
        setLoadingIndex(null)
    }
} catch (error) {
    console.error("Error deleting image item:", error);
    setLoadingIndex(null)
}
}

const showInput = {
  display: inputImages.length!==0 ? "block" : "none"
}

  return (
    <div className='profportfolio'>
      <p className="header">Portfolio <small>Add images of your work</small></p>
       <div className="portfolioImages">
      {portfolio.map((img,index)=>{
      return <div className="portfolioImgbox"  key={index}>
<div className="portfolioImage">
  
           <img src={img} alt="" key={index} />
        </div>
           <div> {loadingIndex===index ? <div className="loaderbox">
      <div className="loader"></div>
    </div> :<button className='removeportimg' onClick={()=>{
            deleteImage(index,img)
           }}>remove image <FontAwesomeIcon icon={faTrash}/></button>  }</div>
      </div>
      
      })}

       <div className="addimagediv portfolioImages" >
        {isLoading ? <div className="loaderbox">
      <div className="loader"></div>
    </div> :  <>
        <label htmlFor="fileInput">
          <FontAwesomeIcon icon={faPlusSquare}/>
        <input style={showInput}
            type="file"
            id="fileInput"
            required
            multiple
            name="images"
            // className="input input-image"
            accept="image/*"
            onChange={handleAddImage}
          />
        </label>
        {inputImages.length !==0 &&  <button type='submit' onClick={handleSubmit}>Save Images</button> }
        </>}
        
      
        
      </div> 
      
      </div>
      
    </div>
  )
}

export default Portfolio

