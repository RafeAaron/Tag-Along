import { addUserAccount, addUser, changePassword, getID, getIDFromUsername, addDriver, verifyBooking, addPassenger, addRating, addLocation, addRide, addUnverifiedBooking, addRequestToJoinRide} from "./db.js"
import { initiatePayment} from "./paymentSystem.js";

export async function addUserToDatabase(dbConnection, user_name, first_name, last_name, email, password, role, age, gender){

    if(user_name.length == 0)
    {
        return JSON.stringify({"Message": "User Name Not Supplied"});
    }

    if(first_name.length == 0)
    {
        return JSON.stringify({"Message": "First Name Not Supplied"});
    }

    if(last_name.length == 0)
    {
        return JSON.stringify({"Message": "Last Name Not Supplied"});
    }

    if(email.length == 0)
    {
        return JSON.stringify({"Message": "Email Not Supplied"});
    }

    if(password.length == 0)
    {
        return JSON.stringify({"Message": "Password Not Supplied"});
    }

    if(password.length < 9)
    {
        return JSON.stringify({"Message": "Password Not Strong Enough"});
    }

    if(password.length < 9)
    {
        return JSON.stringify({"Message": "Role Not Supplied"});
    }

    var result = await addUser(dbConnection, user_name, password, first_name, last_name, email, role, age, gender).catch((err) => {
        //console.log(err);
        return err;
    });

    if(result == undefined)
    {
        return JSON.stringify({"Message": "There Was An Error Adding The User To The Database"})
    }else if(result.errno == 1062)
    {
        return JSON.stringify({"Error": "This Email Is Already Taken"});
    }else{
        return JSON.stringify({"User_ID": result.insertId})
    }

}

export async function addBooking_UnVerified(dbConnection, user_id, start_location, end_location, date, time)
{

    if(user_id.length == 0)
    {
        return JSON.stringify({"Message": "User ID not specified"});
    }

    if(start_location.length == 0)
    {
        return JSON.stringify({"Message": "Start Location not specified"});
    }

    if(end_location.length == 0)
    {
        return JSON.stringify({"Message": "End Location not specified"});
    }
    
    if(date.length == 0)
    {
        return JSON.stringify({"Message": "Date not specified"});
    }

    if(time.length == 0)
    {
        return JSON.stringify({"Message": "Time not specified"});
    }

    var result = await addUnverifiedBooking(dbConnection, user_id, start_location, end_location, date, time).catch((err) => {
        return err;
    })

    if("errno" in result) 
    {
        
        return JSON.stringify({"Message": "There was an error creating a booking", "errno": result.errno});

    }else{

        return JSON.stringify({"Message": "Booking record created", "unverified_booking_id": result.insertId});

    }
}

export async function verifyBookingRecord(dbConnection, driver_id, booking_id)
{

    if(driver_id.length == 0)
    {
        return JSON.stringify({"Message": "Driver ID not specified"});
    }

    if(booking_id.length == 0)
    {
        return JSON.stringify({"Message": "Booking ID not specified"});
    }


    var result = await verifyBooking(dbConnection, driver_id, booking_id).catch((err) => {
        return err;
    })

    if(("errno" in result))
    {
        
        return JSON.stringify({"Message": "There was an error confirming the booking", "errno": result.errno});

    }else{

        return JSON.stringify({"Message": "Booking verified", "booking_id": result.insertId});

    }
}

export async function addPassengerRecord(dbConnection, user_id, ride_id)
{

    if(user_id.length == 0)
    {
        return JSON.stringify({"Message": "User ID not specified"});
    }

    if(ride_id.length == 0)
    {
        return JSON.stringify({"Message": "Ride ID not specified"});
    }

    var result = await addPassenger(dbConnection, user_id, ride_id).catch((err) => {
        return err;
    })

    if(("errno" in result))
    {
        
        return JSON.stringify({"Message": "There was an error adding the passenger", "errno": result.errno});

    }else{

        return JSON.stringify({"Message": "Added Passenger Successfully", "ride_id": ride_id, "user_id": user_id });

    }
}

export async function addRatingRecord(dbConnection, user_id, ride_id, rating, comment, date)
{

    if(user_id.length == 0)
    {
        return JSON.stringify({"Message": "User ID not specified"});
    }

    if(ride_id.length == 0)
    {
        return JSON.stringify({"Message": "Ride ID not specified"});
    }

    if(rating.length == 0)
    {
        return JSON.stringify({"Message": "Rating not specified"});
    }

    if(comment.length == 0)
    {
        return JSON.stringify({"Message": "Comment not specified"});
    }

    if(date.length == 0)
    {
        return JSON.stringify({"Message": "Date not specified"});
    }

    var result = await addRating(dbConnection, user_id, ride_id, rating, comment, date).catch((err) => {
        return err;
    })

    if(("errno" in result))
    {
        
        return JSON.stringify({"Message": "There was an error adding your rating", "errno": result.errno});

    }else{

        return JSON.stringify({"Message": "Rating recorded", "rating_id": result.insertId});

    }
}

export async function addDriverRecord(dbConnection, user_id, car_model, number_plate, color, type)
{

    if(user_id.length == 0)
    {
        return JSON.stringify({"Message": "ID not specified"});
    }

    if(car_model.length == 0)
    {
        return JSON.stringify({"Message": "Car Model not specified"});
    }

    if(number_plate.length == 0)
    {
        return JSON.stringify({"Message": "Number Plate not specified"});
    }
    
    if(color.length == 0)
    {
        return JSON.stringify({"Message": "Color not specified"});
    }

    if(type.length == 0)
    {
        return JSON.stringify({"Message": "Type not specified"});
    }

    var result = await addDriver(dbConnection, user_id, car_model, number_plate, color, type).catch((err) => {
        return err;
    })

    if(("errno" in result))
    {

        return JSON.stringify({"Message": "There was an error making the user a driver", "errno": result.errno});

    }else{

        return JSON.stringify({"Message": "User made a driver in the database", "driver_id": result.insertId});

    }
}

export async function addLocationRecord(dbConnection, name, min_x, min_y, max_x, max_y)
{

    if(name.length == 0)
    {
        return JSON.stringify({"Message": "Location name not specified"});
    }

    if(min_x.length == 0)
    {
        return JSON.stringify({"Message": "Minimum X not specified"});
    }

    if(min_y.length == 0)
    {
        return JSON.stringify({"Message": "Minimum Y not specified"});
    }
    
    if(max_x.length == 0)
    {
        return JSON.stringify({"Message": "Maximum X not specified"});
    }

    if(max_y.length == 0)
    {
        return JSON.stringify({"Message": "Maximum Y not specified"});
    }

    var result = await addLocation(dbConnection, name, min_x, min_y, max_x, max_y).catch((err) => {
        return err;
    })

    if("errno" in result)
    {

        return JSON.stringify({"Message": "There was an error adding the location", "errno": result.errno});

    }else{

        return JSON.stringify({"Message": "Location added successfully", "location_id": result.insertId});

    }
}

export async function addRideRecord(dbConnection, start_location, end_location, current_location_x, current_location_y, route, current_amount, number_of_passengers)
{

    if(start_location.length == 0)
    {
        return JSON.stringify({"Message": "Start Location not specified"});
    }

    if(end_location.length == 0)
    {
        return JSON.stringify({"Message": "End Location not specified"});
    }

    if(current_location_x.length == 0)
    {
        return JSON.stringify({"Message": "current X position not specified"});
    }
    
    if(current_location_y.length == 0)
    {
        return JSON.stringify({"Message": "Current Y position not specified"});
    }

    if(current_amount.length == 0)
    {
        return JSON.stringify({"Message": "Current Fee not specified"});
    }

    if(number_of_passengers.length == 0)
    {
        return JSON.stringify({"Message": "Number of Passengers not specified"});
    }

    var result = await addRide(dbConnection, start_location, end_location, current_location_x, current_location_y, route, current_amount, number_of_passengers).catch((err) => {
        return err;
    })

    if("errno" in result)
    {

        return JSON.stringify({"Message": "There was an error adding the location", "errno": result.errno});

    }else{

        return JSON.stringify({"Message": "Ride added successfully", "ride_id": result.insertId});

    }
}

export async function updateUserPassword(dbConnection, newPassword, ID)
{
    var result = await changePassword(dbConnection,ID, newPassword).catch((err) => {
        console.log(err);
    });

    if(result.affectedRows == 1)
    {
        return JSON.stringify({"message": "Password Changed Successfully"});
    }
    else{
        return JSON.stringify({"message": "No data changed, User might not exist"})
    }

}

export async function makeRequestToTagAlong(dbConnection, user_id, ride_id, current_location_x, current_location_y)
{
    var result = await addRequestToJoinRide(dbConnection, user_id, ride_id, current_location_x, current_location_y).catch((err) => {
        console.log(err);
    });

    if(result.affectedRows == 1)
    {
        return JSON.stringify({"message": "Request Made. Wait until you are allowed"});
    }
    else{
        return JSON.stringify({"err": "There was an error on making the request"});
    }

}

export async function addUserAccountToDatabase(dbConnection, user_id, date_created)
{
    var result = await addUserAccount(dbConnection, user_id, date_created).catch((err) => {
        console.log(err);
    });

    if(result.affectedRows == 1)
    {
        return JSON.stringify({"Message": "User Account Created"});
    }
    else{
        return JSON.stringify({"err": "There was an error creating the account"});
    }

}

export async function initialisePayment(senderID, recieverID, dbConnection, amount, reason)
{

    var result = await initiatePayment(senderID, recieverID, dbConnection, amount, reason).catch((err) => {
        return JSON.stringify({"message": "There was an error initiating a payment"});
    });

    if(result.affectedRows == 1)
    {
        return JSON.stringify({"message": "Payment ID: " + result.insertId});
    }else{
        return JSON.stringify({"message": "Payment initiated failed"});
    }
    
}