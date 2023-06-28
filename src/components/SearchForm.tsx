import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
export interface FormData{
    include : string;
    elseInclude : string;
    notInclude : string;
    sortBy : string;
}
interface SearchFormProps {
    onSubmitForm: (data: FormData) => void; // Callback function for form submission
  }
export const SearchForm=({ onSubmitForm }: SearchFormProps)=>{

    const schema = yup.object().shape({
        include : yup.string().required("Include is required"),
        elseInclude : yup.string(),
        notInclude : yup.string(),
        sortBy : yup.string(),   
    })
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;
        setValue(name as keyof FormData, value);
      };
    const {register,handleSubmit,setValue, formState:{errors}} = useForm<FormData>({
        resolver : yupResolver(schema)
    });

    const submitForm=(data : FormData)=>{
        console.log(data);
        onSubmitForm(data);
    }
    
    return (
    <div className="content">
    <form onSubmit={handleSubmit(submitForm)}>
        <p>Enter the keywords separated by space</p>
        <div className="include">
          <label>Must Include</label>
          <input type="text"  {...register("include")}/>
          <p style={{color:"red"}}>{errors.include?.message}</p>
        </div>
        <div className="elseInclude">
          <label>Either this</label>
          <input type="text" {...register("elseInclude")}/>
        </div>
        <div className="dontInclude">
          <label>Should not include</label>
          <input type="text" {...register("notInclude")}/>
        </div>
        <div className="sort">
          <label>Sort By :</label>
          <input type="radio" name="sortBy" onChange={handleRadioChange}  value="relevancy"  />
          <label>Relevancy</label>
          <input type="radio" name="sortBy" onChange={handleRadioChange} value="popularity" />
          <label>Popularity</label>
          <input type="radio" name="sortBy" onChange={handleRadioChange} value="publishedAt" />
          <label>PublishedAt</label>
        </div>
        <input type="submit" />
      </form>
        </div>
    )
}