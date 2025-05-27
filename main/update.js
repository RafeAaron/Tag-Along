import { updateDriverDetails, updateLocationById, updateLocationByName, updatePassengerNumberInRide, updateRideEndTime, updateRideLocation, updateRouteInformation, updateUserDetails } from "./db.js";

export async function updateLocationInformationUsingId(dbConnection, location_id, name, min_x, min_y, max_x, max_y)
{
    var result = await updateLocationById(dbConnection, location_id, name, min_x, min_y, max_x, max_y).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error updating the location information"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Location Not Found"});
    }else{
        return JSON.stringify({"Message": "Location Updated"});
    }
}

export async function updateUserAccountAmount(dbConnection, user_id, amount)
{
    var result = await updateLocationById(dbConnection, location_id, name, min_x, min_y, max_x, max_y).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error updating the location information"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Location Not Found"});
    }else{
        return JSON.stringify({"Message": "Location Updated"});
    }
}

export async function updateLocationInformationUsingName(dbConnection, location_id, name, min_x, min_y, max_x, max_y)
{
    var result = await updateLocationByName(dbConnection, name, min_x, min_y, max_x, max_y).catch((err) => {
        console.log("There is an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error updating the location information"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Location Not Found"});
    }else{
        return JSON.stringify({"Message": "Location Updated"});
    }
}

export async function updatePassengerNumberInRideInformation(dbConnection, ride_id, number_of_passengers)
{
    var result = await updatePassengerNumberInRide(dbConnection, ride_id, number_of_passengers).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error updating number of passengers in ride"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Ride Not Present"});
    }else{
        return JSON.stringify({"Message": "Number of passengers in ride updated"});
    }
}

export async function updateEndTimeInRideInformation(dbConnection, ride_id, end_time)
{
    var result = await updateRideEndTime(dbConnection, ride_id, end_time).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error updating ride end time"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Ride Not Present"});
    }else{
        return JSON.stringify({"Message": "Ride end time updated"});
    }
}

export async function updateCurrentRideLocation(dbConnection, ride_id, current_location_x, current_location_y)
{
    var result = await updateRideLocation(dbConnection, ride_id, current_location_x, current_location_y).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error in trying to update ride details"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Ride Not Present"});
    }else{
        return JSON.stringify({"Message": "Ride details updated"});
    }
}

export async function updateDriverInformation(dbConnection, driver_id, car_model, number_plate, color, type)
{
    var result = await updateDriverDetails(dbConnection, driver_id, car_model, number_plate, color, type).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error in trying to update driver details"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Driver Not Present"});
    }else{
        return JSON.stringify({"Message": "Driver details updated"});
    }
}

export async function updateUserInformation(dbConnection, user_id, email, first_name, last_name, user_name)
{
    var result = await updateUserDetails(dbConnection, user_id, email, first_name, last_name, user_name).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error in trying to update user details"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "User Not Present"});
    }else{
        return JSON.stringify({"Message": "User details updated"});
    }
}

export async function updateRideInProgressRouteInformation(dbConnection, ride_id, route)
{
    var result = await updateRouteInformation(dbConnection, ride_id, route).catch((err) => {
        console.log("There was an error updating record");
        return err;
    })

    console.log(result);

    if(("errno" in result))
    {
        return JSON.stringify({"Message": "There was an error in trying to update route details"});
    }else if(result.affectedRows == 0)
    {
        return JSON.stringify({"Message": "Ride Not Present"});
    }else{
        return JSON.stringify({"Message": "Route details updated"});
    }
}