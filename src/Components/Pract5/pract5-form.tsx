
import { INode, IStudent, decisionTree } from "../../DataStructures/Node";
import './pract5.scss';

import '../Pract4/pract4.scss';
import { FC, useState } from "react";

export interface IPract5Props {
  onGetDecision: (student: IStudent) => void;
  result: string;
}

const Pract5Form: FC<IPract5Props>  = ({
  onGetDecision,
  result
}) => {
  const [formData, setFormData] = useState({
    grades: 0,
    hasRecommendationLetter: false,
    hasVolunteerExperience: false,
    extraCurriculars: false,
    financialAidNeeded: false,
    attendedPrepCourse: false,
    hasLeadershipExperience: false,
  });

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
   onGetDecision(formData as IStudent);
  };

  return (
    <div className="form-container">
      <h2>Інформація про вступника</h2>

      <div className="characteristic-row">
        <label className="characteristic-label">Середній бал абітурієнта</label>
        <input
          type="number"
          className="select-characteristic"
          name="grades"
          value={formData.grades}
          onChange={handleInputChange}
        />
      </div>

      <label className="checkbox-wrapper">
        <span>Є рекомендаційний лист:</span>
        <input
          type="checkbox"
          name="hasRecommendationLetter"
          checked={formData.hasRecommendationLetter}
          onChange={handleInputChange}
        />
      </label>
      
      <label className="checkbox-wrapper">
        <span>Є досвід волонтерства:</span>
        <input
          type="checkbox"
          name="hasVolunteerExperience"
          checked={formData.hasVolunteerExperience}
          onChange={handleInputChange}
        />
      </label>

      <label className="checkbox-wrapper">
        <span>Займається позакласною активністю:</span>
        <input
          type="checkbox"
          name="extraCurriculars"
          checked={formData.extraCurriculars}
          onChange={handleInputChange}
        />
      </label>

      <label className="checkbox-wrapper">
        <span>Потреба в фінансової допомоги:</span>
        <input
          type="checkbox"
          name="financialAidNeeded"
          checked={formData.financialAidNeeded}
          onChange={handleInputChange}
        />
      </label>

      <label className="checkbox-wrapper">
        <span>Відвідував підготовчі курси:</span>
        <input
          type="checkbox"
          name="attendedPrepCourse"
          checked={formData.attendedPrepCourse}
          onChange={handleInputChange}
        />
      </label>

      <label className="checkbox-wrapper">
        <span>Є лідерські якості:</span>
        <input
          type="checkbox"
          name="hasLeadershipExperience"
          checked={formData.hasLeadershipExperience}
          onChange={handleInputChange}
        />
      </label>

      <button className="recognize-button" onClick={handleSubmit}>
        Отримати рішення
      </button>

      <h2>{result}</h2>

    </div>
  );
}
 

  
export default Pract5Form;