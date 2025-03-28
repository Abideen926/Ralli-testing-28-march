export const BASIC_INFO = {
    logo: '/assets/images/Ralli_Dark_Vert_Logo.png',
    title : 'Basic Information',
    form : [
        {
            label: 'First Name*',
            name:'first_name',
            placeHolder: 'First Name'
        },
        {
            label: 'Middle Initial',
            name:'middle_name',
            placeHolder: 'Middle Initial (Optional)'
        },
        {
            label: 'Last Name*',
            name:'last_name',
            placeHolder: 'Your last name'
        },
        {
            label: 'Gender',
            name:'gender',
            placeHolder: 'Gender'
        },
        {
            label: 'Date Of Birth*',
            name:'dob',
            placeHolder: '2000-03-10'
        },
        {
            label: 'Race/Ethnicity',
            name:'ethnicity',
            placeHolder: 'Ethnicity'
        },
        {
            label: 'Phone Number*',
            name:'phone',
            placeHolder: '(123)-465-7990'
        },
        {
            label: 'Country*',
            name:'country',
            placeHolder: 'Your country name'
        },
        {
            label: 'State*',
            name:'state',
            placeHolder: 'Your state name'
        },
        {
            label: 'City*',
            name:'city',
            placeHolder: 'Your city name'
        },
        {
            label: 'Zip Code*',
            name:'zip_code',
            placeHolder: 'Zip code'
        },
        {
            label: 'Current Address',
            name:'address',
            placeHolder: 'Your address'
        },
        // {
        //     label: 'About',
        //     name:'about',
        //     placeHolder: 'About'
        // },

    ]
}
export const EDU_INFO = {
    logo: '/assets/images/Ralli_Dark_Vert_Logo.png',
    title : 'Education Information',
    form : [
        {
            label: 'Degree/Certifications Name',
            name:'degree',
            placeHolder:'Bachelors'
        },
        {
            label: 'Field Of Study',
            name:'field_of_study',
            placeHolder:'Computer Science'
        },
        {
            label: 'School',
            name: 'institution_name',
            placeHolder: 'Enter Your School Name'
        },
        {
            label: 'Start Date',
            name: 'start_date',
            placeHolder: '01/2010'
        },
        {
            label: 'End Date',
            name: 'end_date',
            placeHolder: '01/2015'
        },
        {
            label: 'Grade/GPA',
            name: 'grade',
            placeHolder: 'A'
        },
        {
            label: 'Degree/Certifications',
            name: 'media',
            placeHolder: 'Upload Degree/Certifications'
        },
        {
            label: 'Skills',
            name: 'skills',
            placeHolder: 'Press Enter To Add Skills'
        },
        {
            label: 'Experience level',
            name:'experience_level',
            placeHolder: 'senior'
        },
    ]
}
export const REGISTRATION_INFO = {
    logo: '/assets/images/Ralli_Dark_Vert_Logo.png',
    title : 'Registration',
    form : [
        {
            label: 'Email Address*',
            name:'email',
            type:'email',
            placeHolder: 'info@example.com'
        },
        {
            label: 'Username*',
            name:'username',
            placeHolder: 'Alber John'
        },
        {
            label: 'Password*',
            name:'password',
            placeHolder: '**********'
        },
        {
            label: 'Confirm Password*',
            name:'password_confirmation',
            placeHolder: '**********'
        },
    ]
}
export const EMAIL_VERIFICATIONS = {
    logo: '/assets/images/Ralli_Dark_Vert_Logo.png',
    title : 'Email Verification',
    description: 'Please Check Your Email (Junk/SPAM), or Phone For The OTP Verification Code.',
    form : [
        {
            name:'verification',
            names: 'Verification Code*',
            placeHolder: 'Enter your OTP'
        }
    ]
}
export const EMAIL_CORRECTION = {
    logo: '/assets/images/Ralli_Dark_Vert_Logo.png',
    title : 'Correction Email',
    form : [
        {
            name: 'email',
            names: 'Enter New Email*',
            placeHolder: 'Enter New Email'
        }
    ]
}