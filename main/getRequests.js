import { getUser, createResetCode, getID, retrieveResetCode, getBookings, getVerifiedBookings, getDriver, getAverageUserRating, passengersInRide, getLocation, getRidesById, getRidesByEndingLocation, getRidesByStartingLocation, getRidesThroughLocation } from "./db.js";

export function welcomeUser(res)
{
    res.write(JSON.stringify({"Message": "Welcome to the platform!"}));
    res.end();
}

export async function getBookingsForUser(dbConnection, userID)
{
    var bookings = await getBookings(dbConnection, userID).catch((err) => {
        console.log("There is an error retrieving records");
        return err;
    })

    //console.log(bookings);

    if(bookings.length == 0)
    {
        return JSON.stringify({"Message": "User doesn't have any bookings"});
    }else{
        return JSON.stringify({"Bookings": bookings});
    }
}

export async function getVerifiedBookingsForUser(dbConnection, userID)
{
    var verifiedBookings = await getVerifiedBookings(dbConnection, userID).catch((err) => {
        console.log("There is an error retrieving records");
        return err;
    })

    if(verifiedBookings.length == 0)
    {
        return JSON.stringify({"Message": "User doesn't have any bookings"});
    }else{
        return JSON.stringify({"Bookings": verifiedBookings});
    }
}

export async function getUserInformation(userName, password, dbConnection)
{
    var user = await getUser(dbConnection, userName, password).catch(error => console.log("There is an error somewhere"));

    if (user.length == 0 ){
        return JSON.stringify({"message": "User doesn't exist"})
    }else{
        return JSON.stringify({"User": user[0]});
    }
}

export async function getDriverInformation(number_plate, dbConnection)
{
    var driver = await getDriver(dbConnection, number_plate).catch(error => console.log("There is an error somewhere"));

    if (driver.length == 0 ){
        return JSON.stringify({"message": "Driver not registered with the system"})
    }else{
        return JSON.stringify({"Driver": driver[0]});
    }
}

export async function getAverageUserRatingInformation(user_id, dbConnection)
{
    var average_rating = await getAverageUserRating(dbConnection, user_id).catch(error => console.log("There is an error somewhere: ", error));

    console.log(average_rating);
    
    if (average_rating[0].user_rating == null ){
        return JSON.stringify({"Message": "User not yet rated"})
    }else{
        return JSON.stringify({"Rating": average_rating[0].user_rating});
    }
    
}

export async function getPassengersInRide(ride_id, dbConnection)
{
    var passengers = await passengersInRide(dbConnection, ride_id).catch(error => console.log("There is an error somewhere: ", error));

    console.log(passengers);
    
    if (passengers.length == 0 ){
        return JSON.stringify({"Message": "No passengers present in ride"})
    }else{
        return JSON.stringify({"Passengers": passengers});
    }
    
}

export async function getLocationInformation(location_id, dbConnection)
{
    var location = await getLocation(dbConnection, location_id).catch(error => console.log("There is an error somewhere: ", error));

    console.log(location);
    
    if (location.length == 0 ){
        return JSON.stringify({"Message": "No location registered with this id"})
    }else{
        return JSON.stringify({"Location": location});
    }
    
}

export async function getRidesByIdInformation(ride_id, dbConnection)
{
    var ride = await getRidesById(dbConnection, ride_id).catch(error => console.log("There is an error somewhere: ", error));

    console.log(ride);
    
    if (ride.length == 0 ){
        return JSON.stringify({"Message": "No ride present with this id"})
    }else{
        return JSON.stringify({"Ride(s)": ride});
    }
    
}

export async function getRidesByStartingLocationInformation(starting_location, dbConnection)
{
    var ride = await getRidesByStartingLocation(dbConnection, starting_location).catch(error => console.log("There is an error somewhere: ", error));

    console.log(ride);
    
    if (ride.length == 0 ){
        return JSON.stringify({"Message": "No ride present with this starting location"})
    }else{
        return JSON.stringify({"Ride(s)": ride});
    }
    
}

export async function getRidesThroughLocationInformation(location_id, dbConnection)
{
    var ride = await getRidesThroughLocation(dbConnection, location_id).catch(error => console.log("There is an error somewhere: ", error));

    console.log(ride);
    
    if (ride.length == 0 ){
        return JSON.stringify({"Message": "No ride present passing through that location"})
    }else{
        return JSON.stringify({"Ride(s)": ride});
    }
    
}

export async function getRidesByEndingInformation(ending_location, dbConnection)
{
    var ride = await getRidesByEndingLocation(dbConnection, ending_location).catch(error => console.log("There is an error somewhere: ", error));

    console.log(ride);
    
    if (ride.length == 0 ){
        return JSON.stringify({"Message": "No ride present with this ending location"})
    }else{
        return JSON.stringify({"Ride(s)": ride});
    }
    
}

export async function getResetCode(dbConnection, userID)
{

    var resetCodes = await retrieveResetCode(dbConnection, userID).catch((error) => {
        return JSON.stringify({"message": "There was an error retrieving the reset Codes"});
    });

    if(resetCodes.length == 0)
    {
        return JSON.stringify({"message": "There are no reset codes for this user"})
    }
    else{
        return JSON.stringify({"message": resetCodes})
    }
}

export async function createCodeForReset(dbConnection, gmailAddress)
{
    var userID = await getID(dbConnection, gmailAddress);

    if(userID.length == 0)
    {
        return JSON.stringify({"message": "The User doesn't exist"});
    }else{

    var value = await createResetCode(dbConnection, userID[0].id)
    
    if(value)
    {
        //console.log(result);
        return JSON.stringify({"message": "Reset Code Created"});
    }
    else{
        return JSON.stringify({"message": "There was an error creating the reset code"});
    }
}

}
