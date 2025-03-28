export const CREATE_JOB_FORM = {
    form : [
        {
            title: 'Job Title',
            name: 'title',
            placeHolder: 'Job Title',
            type: 'text'
        },
        {
            title: 'Number Of Position To Be Filled',
            name: 'no_of_positions',
            placeHolder: '0',
            type:'number'
        },
        {
            title: 'Application Deadline',
            name: 'deadline',
            placeHolder: 'Select Deadline',
            type: 'date'
        },
        {
            title: 'Experience level',
            name:'experience_level',
            placeHolder: 'senior',
            type: 'dropdown'
        },
        {
            title: 'Job Category',
            name: 'job_categories',
            placeHolder: 'Select Category',
            type: 'dropdown'
        },
        {
            title: 'Job Type',
            name: 'job_types',
            placeHolder: 'Select Type',
            type: 'dropdown'
        },
        {
            title: 'Job Location',
            name: 'job_locations',
            placeHolder: 'Select Location',
            type: 'dropdown'
        },
        {
            title: 'Job Shift',
            name: 'job_shifts',
            placeHolder: 'Select Shift',
            type: 'dropdown'
        },
        {
            title: 'Shift Hours',
            name: 'job_shift_timing',
            placeHolder: '8',
            type: 'dropdown'
        },
        {
            title: 'Country',
            name: 'country',
            placeHolder: 'Select Country',
            type: 'dropdown'
        },
        {
            title: 'State',
            name: 'states',
            placeHolder: 'Select State',
            type: 'dropdown'
        },
        {
            title: 'City',
            name: 'cities',
            placeHolder: 'Select City',
            type: 'dropdown'
        },
        {
            title: 'Skills',
            name: 'skills',
            placeHolder: 'Press Enter To Add Skills',
            type: 'taginput'
        },
        {
            title: 'Salary',
            name: 'salary',
            placeHolder: 'Salary',
            type: 'number'
        },
        {
            title: 'Salary Period',
            name: 'salary_period',
            placeHolder: 'Per Annum',
            type: 'text'
        },
        {
            title: 'Salary Currency',
            name: 'salary_currency',
            placeHolder: 'USD',
            type: 'text'
        },
        {
            title: 'About The Company',
            name: 'company_about',
            placeHolder: 'About Your Company',
            type: 'textarea'
        },
        {
            title: 'Benefits',
            name: 'company_benefits',
            placeHolder: 'Benefits',
            type: 'textarea'
        },
        {
            title: 'Job Requirements',
            name: 'requirements',
            placeHolder: 'Requirements for this job',
            type: 'textarea',
            ai:true
        },
        {
            title: 'Job Description',
            name: 'description',
            placeHolder: 'Description for job',
            type: 'textarea',
            ai:true
        },
    ]
}