# archHacks
## Inspiration
Parkinsons is a debilitating disease that causes both financial and emotional distress to its victims and their families. Worldwide, there are more than 4 million individuals diagnosed with the disease yearly; in the US alone there are currently 1 million Americans suffering from the disease. 
We often see as the disease progresses, patients tend to lose their cognitive abilities and they do not receive proper treatment as they are unable to address their tremor severity symptoms to the doctor. Hence it becomes very hard for the doctors to actually determine whether the medication is working properly or not. This is a major issue we are addressing by providing extensive research data using data analytics, machine learning and exploiting the accelerometer and EMG data of the myoband. Even though Parkinsons disease is still incurable our major intention is to provide research to improve their condition even for a period of 10-20 years.  With our current technology,  ways to diagnose patients and monitor their progression through treatment are constrained to expensive, in-patient methods such as MRI’s and PET scans. From this comes the need for a more affordable, more efficient, streamlined process.  Such a process should have the means to diagnose whether an individual has Parkinsons and provide a platform for which a doctor can monitor a patient and their rehabilitation process even when the patient is in the confines of their own home.

## What it does
Parkinsons Help is a web app with two portals; one for the patient and one for the Doctor. For the web-app to function the patient needs to wear the myoband for just 30 seconds each day. The myoband captures around 7000 data points of accelerometer and EMG data. 

The web app returns mean tremor severity for the patients in a particular day and the patient can observe the live streaming of the data through his portal. We accumulate all the results for a period of 7 days, upload it to the AWS cloud to perform data analytics and send graphical data to the doctor containing mean tremor severity values for the patients with respect to each day.
The doctor can easily figure out the increase or decrease in the tremor severity values for a period of 7 days and understand the effect of the medication on the patients.

We have also included twilio messaging system to set a reminder to the Parkinsons patient to wear the myoband in a day as they generally tend to forget things with progression of their disease.

Moreover, we have included a functionality which can determine if a patient is suffering from Parkinsons. We have used machine learning to analyze data sets of Parkinsons patients' EMG data to determine the difference between the EMG data of a Parkinsons patient compared to a normal individual.

## How we built it
React Native- Streaming and Webapp. Python- Tensor flow and deep convolutional network, Amazon ML to detect Parkinsons patients. Python for data analytics.

## Challenges we ran into
To develop a product within 36 hours to live stream and analyze accelerometer data was really challenging. Moreover acquiring EMG data for Parkinson patients was also quite challenging as we gathered it after extensive research.
Performing real time data analytics.

## Contact
Please contact us for more info:
Michael Sweetland- mjsweet@umich.edu
Saptarshi Banerjee- banerjee.saptarshi44@gmail.com
Alejandro- reyesale@umich.edu
Griffin Miller-millergd@umich.edu
