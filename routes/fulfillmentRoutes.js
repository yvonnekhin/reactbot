const { WebhookClient } = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Coupon = mongoose.model('coupon');

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function snoopy(agent) {
            let text = 'Welcome to my Snoopy fulfillment!';
            agent.add(text);
        }

        async function learn(agent) {
            agent.add(`Welcome to my Snoopy fulfillment!`);
        }

        function learn(agent) {
            Demand.findOne({'course': agent.parameters.courses}, function(err, course) {
                console.log(course);
                if (course !== null ) {
                    course.counter++;
                    course.save();
                } else {
                    const demand = new Demand({course: agent.parameters.courses});
                    demand.save();
                }
            });
            let responseText = `You want to learn about ${agent.parameters.courses}. 
                    Here is a link to all of my courses: https://www.udemy.com/user/jana-bergant`;
            
            let coupon = await Coupon.findOne({'course': agent.parameters.courses});
            if(coupon !== null) {
                responseText = `You want to learn about ${agent.parameters.courses}. 
                Here is a link to the course: ${coupon.link}`;
            }
            agent.add(responseText);
        }

        function fallback(agent) {
            // To send back a text response to DialogFlow
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
      
        let intentMap = new Map();
        // intentMap.set('< Intent's name >', <method that will handle it>);
        intentMap.set('snoopy', snoopy);
        intentMap.set('learn courses', learn);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

} 