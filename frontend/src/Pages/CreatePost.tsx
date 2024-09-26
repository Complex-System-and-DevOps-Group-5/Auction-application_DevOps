import { InputField } from '../Components/InputField';
import DefaultButton from '../Components/DefaultButton';


export function CreatePost() {
    return (
        <div className="create-post-container">

            <div className="create-post-content">
                <h1>Create a post</h1>

                <div className="section-product-description">
                    <h2>Product description</h2>
                    
                    <DefaultButton className='add-images'
                        text='Add Images'  
                        onClick={() => console.log('Add Images clicked')} 
                    />

                    <InputField className='title-field'
                        name="title"
                        type="text"
                        placeholder="Enter title"
                    />
                    
                    <textarea
                        className="product-text"
                        placeholder="Describe your product (200-500 words)"
                    />
                </div>

                <div className="section-contact-information">
                    <h2>Contact information</h2>
                    <InputField 
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                    <InputField 
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                    />
                </div>
            </div>
        </div>
    );
}
