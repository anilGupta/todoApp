import moment from 'moment-timezone';

const
	helper = {
		constructFormData : (options) => {
			const defaults = {},
				item     = Object.assign({}, defaults, options),
				formData = new FormData();
				Object.keys(item).forEach((key)=>{
						formData.append(key, item[key]);
				});
			return formData;
		},
		getToken : state =>{
			const { auth: { user: {token}}} = state();
			return token;
		},
		capitalize : (text) => text.map(word => word.charAt(0).toUpperCase()),
		capitalizeFirstLetter : (text) => text.charAt(0).toUpperCase() + text.slice(1),
		shortDate: (date, year) => new Date(date).toLocaleDateString('en', year ? { month: 'short', day: '2-digit',  year: 'numeric'} : { month: 'short', day: '2-digit'})
  },
};

export default helper;
