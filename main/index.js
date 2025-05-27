import {createServer} from "http";
import {parse} from 'querystring';
import { createConnection, addUser, closeConnection, getID, getIDFromUsername, getAllActiveRides, getPaymentsThatMatchId, getUserUsingUserName, getPassengersRequestingRide, getRideWithUser, isDriverInRide, passengerNumbers, updateUserAmount } from "./db.js";
import {welcomeUser, getUserInformation, createCodeForReset, getResetCode, getBookingsForUser, getVerifiedBookingsForUser, getDriverInformation, getAverageUserRatingInformation, getPassengersInRide, getLocationInformation, getRidesByIdInformation, getRidesByStartingLocationInformation, getRidesByEndingInformation, getRidesThroughLocationInformation, getDriverFromUserID, getUserUsingID, getUserAccountInformation} from "./getRequests.js";
import {addUserToDatabase, updateUserPassword, initialisePayment, addDriverRecord, addBooking_UnVerified, verifyBookingRecord, addLocationRecord, addRideRecord, addPassengerRecord, addRatingRecord, makeRequestToTagAlong, addUserAccountToDatabase} from "./postRequests.js";
import { sendResetCode, sendWelcomeEmail } from "./email.js";
import { updateCurrentRideLocation, updateDriverInformation, updateEndTimeInRideInformation, updateLocationInformationUsingId, updateLocationInformationUsingName, updatePassengerNumberInRideInformation, updateRideInProgressRouteInformation, updateUserInformation } from "./update.js";

/*
    Finished apis
        sendWelcomeEmail
        verifyUser
        initializePayment
        /
        getResetCode
        getUser
        updatePassword
        createResetCode
        addUser
        sendResetCodeEmail

        addLocation
        advertiseBooking
        verifyBooking
        make_driver
        addRide
        addPassenger
        addRating

        getBookings
        getVerifiedBookings
        getDriverInformation
        getDriverFromUserID
        getAverageRating
        getPassengersInRide
        getLocationInformation
        getRidesById
        getRidesByStartingLocation
        getRidesByEndingLocation
        getActiveRides
        getUser

        updateLocationById
        updateLocationNyName
        updatePassengerNumberInRide
        updateCurrentLocationOfRide
        updateDriverInformation
        updateUserInformation
        updateRideEndTime
        updateRouteInformation
*/

var databaseConnection = await createConnection();

var server = createServer( async (req, res) => {

    let baseurl = req.url.split("?")[0]

    console.log(req.url);
    
    switch(baseurl)
    {

        case "/requestToTagAlong":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["user_id", "ride_id", "current_location_x", "current_location_y"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await makeRequestToTagAlong(databaseConnection, info.user_id, info.ride_id, info.current_location_x, info.current_location_y);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/getUser":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide user_id"}));
                res.end();
                break;
            }

            console.log("User ID: " + queryParams.user_id);
    
            let message = await getUserUsingID(queryParams.user_id, databaseConnection);
            res.write(message);
            res.end()
            break;
        }

        case "/getPassengersRequestingRide":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("ride_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide ride_id"}));
                res.end();
                break;
            }

            let message = await getPassengersRequestingRide(databaseConnection, queryParams.ride_id);
            res.write(message);
            res.end()
            break;
        }

        case "/getActiveRides":
        {
            let message = await getAllActiveRides(databaseConnection);
            res.write(message);
            res.end();
            break;
        }

        case "/getRidePassingNearLocation":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("location_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide location_id"}));
                res.end();
                break;
            }
    
            let message = await getRidesThroughLocationInformation(parseInt(queryParams.location_id), databaseConnection);
            res.write(message);
            res.end()
            break;
            
        }

        case "/updateRouteInformation":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["ride_id", "route"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updateRideInProgressRouteInformation(databaseConnection, info.ride_id, info.route);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/updateRideEndTime":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["ride_id", "end_time"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updateEndTimeInRideInformation(databaseConnection, info.ride_id, info.end_time);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/getPaymentsForUser":
        {

            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide user_id"}));
                res.end();
                break;
            }

            console.log("User ID: " + queryParams.user_id);
    
            let message = await getPaymentsThatMatchId(databaseConnection, queryParams.user_id);
            res.write(message);
            res.end()
            break;

        }

        case "/updateUserInformation":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["user_id", "email", "first_name", "last_name", "user_name"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updateUserInformation(databaseConnection, info.user_id, info.email, info.first_name, info.last_name, info.user_name);
                res.write(message);
                res.end();

            }

            break;   
        }

        case "/updateDriverInformation":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["driver_id", "car_model", "color", "type", "number_plate"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updateDriverInformation(databaseConnection, info.driver_id, info.car_model, info.number_plate, info.color, info.type);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/updateCurrentLocationOfRide":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["current_location_x", "current_location_y"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updateCurrentRideLocation(databaseConnection, info.ride_id, info.current_location_x, info.current_location_y);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/updatePassengerNumberInRide":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["ride_id", "number_of_passengers"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updatePassengerNumberInRideInformation(databaseConnection, info.ride_id, info.number_of_passengers);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/updateLocationById":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["location_id", "name", "min_x", "min_y", "max_x", "max_y"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updateLocationInformationUsingId(databaseConnection, info.location_id ,info.name, info.min_x, info.min_y, info.max_x, info.max_y);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/updateLocationByName":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["name", "min_x", "min_y", "max_x", "max_y"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await updateLocationInformationUsingName(databaseConnection, info.location_id ,info.name, info.min_x, info.min_y, info.max_x, info.max_y);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/getRidesInProgressById":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("ride_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide ride_id"}));
                res.end();
                break;
            }
    
            let message = await getRidesByIdInformation(queryParams.ride_id, databaseConnection);
            res.write(message);
            res.end()
            break;
        }

        case "/getRidesInProgressByStartingLocation":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("start_location" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide start_location"}));
                res.end();
                break;
            }
    
            let message = await getRidesByStartingLocationInformation(queryParams.start_location, databaseConnection);
            res.write(message);
            res.end()
            break;
        }

        case "/getDriverUsingUserID":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide user_id"}));
                res.end();
                break;
            }
    
            let message = await getDriverFromUserID(queryParams.user_id, databaseConnection);
            res.write(message);
            res.end()
            break;
        }

        case "/getRidesInProgressByEndingLocation":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("end_location" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide end_location"}));
                res.end();
                break;
            }
    
            let message = await getRidesByEndingInformation(queryParams.end_location, databaseConnection);
            res.write(message);
            res.end()
            break;
        }

        case "/getRideWithUserID":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);
    
            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide user_id"}));
                res.end();
                break;
            }
    
            let message = await getRideWithUser(databaseConnection, queryParams.user_id)
            res.write(message);
            res.end()
            break;
        }

        case "/getLocationInformation":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("location_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide location_id"}));
                res.end();
                break;
            }

            let message = await getLocationInformation(queryParams.location_id, databaseConnection);
            res.write(message);
            res.end()
            break;
        }

        case "/getPassengersInRide":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("ride_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide ride_id"}));
                res.end();
                break;
            }

            let message = await getPassengersInRide(queryParams.ride_id, databaseConnection);
            res.write(message);
            res.end()
            break;
        }

        case "/getAverageRating":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide number_plate"}));
                res.end();
                break;
            }

            let message = await getAverageUserRatingInformation(queryParams.user_id, databaseConnection);

            res.write(message);
            res.end();
            break;

        }

        case "/getDriverInformation":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("number_plate" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide number_plate"}));
                res.end();
                break;
            }

            let message = await getDriverInformation(queryParams.number_plate, databaseConnection);

            res.write(message);
            res.end();

            break;
        }

        case "/getBookings":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide the user_id"}));
                res.end();
                break;
            }

            let message = await getBookingsForUser(databaseConnection, parseInt(queryParams.user_id));

            res.write(message);
            res.end();

            break;

        }

        case "/getVerifiedBookings":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide the user_id"}));
                res.end();
                break;
            }

            let message = await getVerifiedBookingsForUser(databaseConnection, parseInt(queryParams.user_id));

            res.write(message);
            res.end();

            break;

        }

        case "/getPassengersInRide":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("ride_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide the ride_id"}));
                res.end();
                break;
            }

            let message = await passengerNumbers(databaseConnection, parseInt(queryParams.ride_id));

            res.write(message);
            res.end();

            break;

        }

        case "/isDriverInActiveRide":
        {
            let queryParameters = req.url.split("?");
            let queryParams = parse(queryParameters[1]);

            if(!("user_id" in queryParams))
            {
                res.write(JSON.stringify({"Message": "Please provide the user_id"}));
                res.end();
                break;
            }

            let message = await isDriverInRide(databaseConnection, parseInt(queryParams.user_id));

            res.write(message);
            res.end();

            break;

        }

        case "/addPassenger":
        {
            var info = await getData(req);
            console.log(info);

            let neccessary_fields = ["user_id", "ride_id"];
            let missing_fields = [];
            
            for(let i = 0; i < neccessary_fields.length; i++)
            {

                if(!(neccessary_fields[i] in info))
                {
                    missing_fields.push(neccessary_fields[i]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please include: ";
                for(let a = 0; a < missing_fields.length; a++)
                {
                    if(a == missing_fields.length - 1)
                    {
                        message +=missing_fields[a];
                    }else{
                        message += missing_fields[a] + ", ";
                    }
                }

                res.write(message);
                res.end();
            }else{
                
                let message = await addPassengerRecord(databaseConnection, info.user_id, info.ride_id);

                res.write(message);
                res.end();
            }

            break;

        }

        case "/addRating":
        {
            var info = await getData(req);
            console.log(info);

            let neccessary_fields = ["user_id", "ride_id" , "rating", "comment", "date"];
            let missing_fields = [];
            
            for(let i = 0; i < neccessary_fields.length; i++)
            {

                if(!(neccessary_fields[i] in info))
                {
                    missing_fields.push(neccessary_fields[i]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please include: ";
                for(let a = 0; a < missing_fields.length; a++)
                {
                    if(a == missing_fields.length - 1)
                    {
                        message +=missing_fields[a];
                    }else{
                        message += missing_fields[a] + ", ";
                    }
                }

                res.write(message);
                res.end();
            }else{
                
                let message = await addRatingRecord(databaseConnection, info.user_id, info.ride_id, info.rating, info.comment, info.date);

                res.write(message);
                res.end();
            }

            break;
        }

        case "/addRide":
        {
            var info = await getData(req);
            console.log(info);

            let neccessary_fields = ["start_location", "end_location", "current_location_x", "current_location_y", "current_amount", "number_of_passengers", "route"];
            let missing_fields = [];
            
            for(let i = 0; i < neccessary_fields.length; i++)
            {

                if(!(neccessary_fields[i] in info))
                {
                    missing_fields.push(neccessary_fields[i]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please include: ";
                for(let a = 0; a < missing_fields.length; a++)
                {
                    if(a == missing_fields.length - 1)
                    {
                        message +=missing_fields[a];
                    }else{
                        message += missing_fields[a] + ", ";
                    }
                }

                res.write(message);
                res.end();
            }else{
                
                let message = await addRideRecord(databaseConnection, info.start_location, info.end_location, info.current_location_x, info.current_location_y, info.route, info.current_amount, info.number_of_passengers);

                res.write(message);
                res.end();
            }

            break;
        }

        case "/updateUserAmount":
        {
            var info = await getData(req);
            console.log(info);

            let neccessary_fields = ["amount", "user_id"];
            let missing_fields = [];
            
            for(let i = 0; i < neccessary_fields.length; i++)
            {

                if(!(neccessary_fields[i] in info))
                {
                    missing_fields.push(neccessary_fields[i]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please include: ";
                for(let a = 0; a < missing_fields.length; a++)
                {
                    if(a == missing_fields.length - 1)
                    {
                        message += missing_fields[a];
                    }else{
                        message += missing_fields[a] + ", ";
                    }
                }

                res.write(message);
                res.end();
            }else{

                let user = JSON.parse(await getUserAccountInformation(info.user_id, databaseConnection));
                var amount = 0;
                
                console.log(user);

                if(!("Account" in user))
                {
                    return JSON.stringify({"error": "user doesn't exist"});
                }else{
                    amount = user.Account.amount + info.amount;
                }

                if(amount == 0)
                {
                    return JSON.stringify({"error": "There was am error updating user account information"});
                }

                let message = await updateUserAmount(databaseConnection, info.user_id, amount).then((result) => {
                    if(("affectedRows" in result))
                    {
                        return JSON.stringify({"message": "Amount updated"});
                    }else{
                        return JSON.stringify({"error": "Failed to update amount"});
                    }
                })

                res.write(message);
                res.end();
            }
            break;
        }

        case "/advertiseBooking":
        {
            var info = await getData(req);
            console.log(info);

            //user_id, start_location, end_location, date, initial_amount, time

            let neccessary_fields = ["user_id", "start_location", "end_location", "date", "time"];
            let missing_fields = [];
            
            for(let i = 0; i < neccessary_fields.length; i++)
            {

                if(!(neccessary_fields[i] in info))
                {
                    missing_fields.push(neccessary_fields[i]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please include: ";
                for(let a = 0; a < missing_fields.length; a++)
                {
                    if(a == missing_fields.length - 1)
                    {
                        message +=missing_fields[a];
                    }else{
                        message += missing_fields[a] + ", ";
                    }
                }

                res.write(message);
                res.end();
            }else{
                
                let message = await addBooking_UnVerified(databaseConnection, info.user_id, info.start_location, info.end_location, info.date, info.time)

                res.write(message);
                res.end();
            }

            break;
        }

        case "/verifyBooking":
        {
            var info = await getData(req);
            console.log(info);

            if(!("driver_id" in info))
            {
                res.write(JSON.stringify({"Message": "Please include driver_id"}));
                res.end();
                break;
            }

            if(!("booking_id"  in info))
            {
                res.write(JSON.stringify({"Message": "Please include booking_id"}));
                res.end();
                break;
            }

            var message = await verifyBookingRecord(databaseConnection, info.driver_id, info.booking_id);
            
            res.write(message);
            res.end();

            break;
        }

        case "/addLocation":
        {
            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["name", "min_x", "min_y", "max_x", "max_y"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await addLocationRecord(databaseConnection, info.name, info.min_x, info.min_y, info.max_x, info.max_y);
                res.write(message);
                res.end();

            }

            break;
        }

        case "/make_driver":
        {
            var info = await getData(req);
            console.log(info);

            if(!("user_id" in info))
            {
                res.write(JSON.stringify({"Message": "Please include user_id"}));
                res.end();
                break;
            }

            if(!("car_model" in info))
            {
                res.write(JSON.stringify({"Message": "Please include car_model"}));
                res.end();
                break;
            }

            if(!("number_plate" in info))
            {
                res.write(JSON.stringify({"Message": "Please include number_plate"}));
                res.end();
                break;
            }

            if(!("color" in info))
            {
                res.write(JSON.stringify({"Message": "Please include color"}));
                res.end();
                break;
            }
    
            if(!("type" in info))
            {
                res.write(JSON.stringify({"Message": "Please include type"}));
                res.end();
                break;
            }

            let message = await addDriverRecord(databaseConnection, info.user_id, info.car_model, info.number_plate, info.color, info.type);

            res.write(message);
            res.end();

            break;
        }

        case "/sendWelcomeEmail":
        {

            var info = await getData(req);
            console.log(info);

            if(!("user_email_address" in info))
            {

                res.write(JSON.stringify({"Message": "Please include user_email_address"}));
                res.end();
                break;

            }

            if(!("user_name" in info)){
                res.write(JSON.stringify({"Message": "Please provide a user_name"}));
                res.end();
                break;
            }

            sendWelcomeEmail(info.user_email_address, info.user_name)
            break;
        }

        case "/": 
        {
            welcomeUser(res);
            break;
        }

        case "/initialisePayment":
        {
            var info = await getData(req);
            console.log(info);

            if(!("sender_user_id" in info))
            {
                res.write(JSON.stringify({"message": "Please provide a value for the sender_user_id"}))
                res.end();
                return;
            }

            if(!("reciever_user_id" in info))
            {
                res.write(JSON.stringify({"message": "Please provide a value for the reciever_user_id"}))
                res.end();
                return;
            }

            if(!("amount" in info))
            {
                res.write(JSON.stringify({"message": "Please specify an amount"}));
                res.end();
                break;
            }

            console.log(info.amount);

            if(!("reason" in info))
            {
                res.write(JSON.stringify({"message": "Please specify reason"}));
                res.end();
                break;
            }

            console.log(info.reason);

            var success = await initialisePayment(info.sender_user_id, info.reciever_user_id, databaseConnection, info.amount, info.reason);

            res.write(success);
            res.end();

            break;
        }

        

        case "/getResetCode":
        {
            var info = await getData(req);
            console.log(info);

            if(!("emailAddress" in info))
            {
                res.write(JSON.stringify({"message": "Please provide an emailAddress to the API."}))
                res.end();
                break;
            }

            var userID = await getID(databaseConnection, info.emailAddress)

            if(userID.length == 0)
            {
                res.write(JSON.stringify({"message": "No User registered with this email"}))
                res.end();
                break;
            }else{

                var message = await getResetCode(databaseConnection, userID[0].id);

                console.log(message);

                res.write(message);
                res.end();
                break;
            }

            break;
        }

        case "/verifyUser":
        {
            var info = await getData(req);

            console.log(info);

            if(!("user_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a user_name"}));
                res.end();
                break;
            }

            if(!("password" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a password"}));
                res.end();
                break;
            }

            var message = await getUserInformation(info.user_name, info.password, databaseConnection);

            res.write(message);
            res.end();

            break;
        }

        case "/getUserAccountFromUserName":
        {
            var info = await getData(req);

            console.log(info);

            if(!("user_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a user_name"}));
                res.end();
                break;
            }

            var message = await getUserUsingUserName(databaseConnection, info.user_name)

            res.write(message);
            res.end();

            break;
        }


        case "/getUserAccount":
        {

            var info = await getData(req);
            console.log(info);

            let necessary_fields = ["user_id"];
            let missing_fields = [];

            for(let a = 0; a < necessary_fields.length; a++)
            {
                if(!(necessary_fields[a] in info))
                {
                    missing_fields.push(necessary_fields[a]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please provide ";

                for(let b = 0; b < missing_fields.length; b++)
                {
                    if(b == missing_fields.length - 1)
                    {
                        message += missing_fields[b];
                    }else
                    {
                        message += missing_fields[b] + ", ";
                    }
                }

                res.write(JSON.stringify({"Message": message}));
                res.end();

            }else{

                var message = await getUserAccountInformation(info.user_id, databaseConnection);
                res.write(message);
                res.end();

            }

            break;

        }

        case "/addUserAccount":
        {
            var info = await getData(req);

            console.log(info);

            if(!("user_id" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a user_id"}));
                res.end();
                break;
            }

            if(!("date" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a date"}));
                res.end();
                break;
            }

            var message = await addUserAccountToDatabase(databaseConnection, info.user_id, info.date);

            res.write(message);
            res.end();

            break;
        }

        case "/updatePassword":
        {
            var info = await getData(req);
            console.log(info);

            var message = await updateUserPassword(databaseConnection, info.newPassword, info.Id);

            res.write(message);
            res.end();

            break;
        }

        case "/createResetCode":
        {
            var info = await getData(req);
            console.log(info);

            if(!("emailAddress" in info))
            {
                console.log("Error")
                res.write(JSON.stringify({"message": "Please provide an email address"}));
                res.end();
            }else{
                var message = await createCodeForReset(databaseConnection, info.emailAddress);
                console.log(message)
                res.write(message);
                res.end();
            }

            break;

        }

        case "/addUser":
        {
            var info = await getData(req);
            console.log(info);

            if(!("user_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for user_name"}));
                console.log("Checking");
                res.end();
                break;
            }

            if(!("age" in info))
                {
                    res.write(JSON.stringify({"Message": "Please provide a value for user_name"}));
                    console.log("Checking");
                    res.end();
                    break;
                }

            if(!("gender" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for user_name"}));
                console.log("Checking");
                res.end();
                break;
            }

            if(!("first_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for first_name"}));
                res.end();
                break;
            }

            if(!("last_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for last_name"}));
                res.end();
                break;
            }
    
            if(!("email" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for email"}));
                res.end();
                break;
            }
            
            if(!("password" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for password"}));
                res.end();
                break;
            }

            if(!("role" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for role"}));
                res.end();
                break;
            }

            var message = await addUserToDatabase(databaseConnection, info.user_name, info.first_name, info.last_name, info.email, info.password, info.role, info.age, info.gender);
            res.write(message);
            res.end();

            break;
        }

        
    }

}).listen(8090);

async function getData(req){
    return new Promise((resolve, reject) => {
        let message = "";

        req.on('data', (chunk) => {
            message += chunk.toString();
        })

        req.on('end', ()=>{
            console.log("Data stream ended")

            if(message != ""){
                resolve(JSON.parse(message));
            }
            else{
                resolve({})
            }
        })
    })

}
