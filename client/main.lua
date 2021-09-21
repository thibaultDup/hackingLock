-- LICENSE
-- MIT License

-- Copyright (c) 2021 thibaultDup

-- Permission is hereby granted, free of charge, to any person obtaining a copy
-- of this software and associated documentation files (the "Software"), to deal
-- in the Software without restriction, including without limitation the rights
-- to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
-- copies of the Software, and to permit persons to whom the Software is
-- furnished to do so, subject to the following conditions:

-- The above copyright notice and this permission notice shall be included in all
-- copies or substantial portions of the Software.

-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
-- SOFTWARE.

-- END LICENSE

targetedVehicle = nil

-- THREADS --------------------------------------------------------------------------

-- Main Thread - Check if the player press H and if so start the script sequences
Citizen.CreateThread(function()

	print("Client running")
	
	while true do
		Citizen.Wait(1)
		-- vehicle = GetVehiclePedIsIn(PlayerPedId())
		
		--If the player presses the key 'H'
		if IsControlJustPressed(0, 74) then
		
			_player = PlayerPedId()
			--get player coords
			playerCoords = GetEntityCoords(_player)
			--get the closest vehicle from the player
			vehicle = GetClosestVehicle(playerCoords.x,playerCoords.y,playerCoords.z, 10.0, 0, 70)
			isLocked = false
			
			
			--Check if the vehicle is locked for the player
			-- local isLocked = GetVehicleDoorsLockedForPlayer(vehicle, _player)
			

			if ( (GetVehicleDoorLockStatus(vehicle) == 2) or (GetVehicleDoorLockStatus(vehicle) == 3) ) then 
				isLocked = true
			end
			
			
			--If their is a vehicle capted near the player
			if ( (vehicle ~= 0) and (isLocked) and not (IsPedInAnyVehicle(_player, false)) ) then
				
				Citizen.Wait(500)
				targetedVehicle = vehicle
				
				--Get the model of the vehicle near the player
				_model = GetDisplayNameFromVehicleModel(GetEntityModel(vehicle))
				--print(_model)
				
				--Send the model of the car and the showStatus to the UI (NUI)
				SendNUIMessage({
				
					model = _model,
					showStatus = true
				
				})
				
				Citizen.Wait(1000)
				--Set the focus the UI (NUI)
				SetMouseCursorVisibleInMenus(true)
				SetNuiFocus(true, true)
				
				--Make the playerPed get his phone out 
				TaskStartScenarioInPlace(_player, 'WORLD_HUMAN_STAND_MOBILE', 0, true)
				
			end
			
		end
	
	end
	
end)

-- END THREADS --------------------------------------------------------------------------


-- FUNCTIONS --------------------------------------------------------------------------

--When the player press the Abord button
function dropTheHack()

	--Send  the showStatus to the UI (NUI) so it will 'close' the UI
	SendNUIMessage({
				
		model = nil,
		showStatus = false
				
	})
				
	--Stop the task of the player having is phone out
	ClearPedTasks(_player)
	--Take back the focus from the UI (NUI)
	SetMouseCursorVisibleInMenus(false)
	SetNuiFocus(false, false)

end

--Triggers the alarm of the car the player is trying to hack 
function triggerAlarm()

	SetVehicleAlarmTimeLeft(targetedVehicle, 20000)
	dropTheHack()
	
	--Make the car lights blink (to add effect to the alarm sound)
	for i = 0, 15 do
		Citizen.Wait(150)
		SetVehicleLights(targetedVehicle, 2)
		Citizen.Wait(150)
		SetVehicleLights(targetedVehicle, 0)
	end

end


--Unlock the car for the player
function unclockCar()

	SetVehicleDoorsLocked(targetedVehicle, false)
	dropTheHack()
	SetVehicleDoorOpen(targetedVehicle, 0, false, true)
	SetVehicleEngineOn(targetedVehicle, true, true, false)

end



-- END FUNCTIONS --------------------------------------------------------------------------



-- NUI CALLBACKS --------------------------------------------------------------------------

RegisterNUICallback('multifunctionCallback', function(data, cb) 

	local _abort = data.abort
	local _hackFailed = data.hackFailed
	local _hackSuccess = data.hackSuccess
	
	--print(_hackFailed)
	
	--When the player press the UI [ ABORT ] button
	if(_abort == "true") then
	
		dropTheHack()
	
	end
	
	--When the player Failed 3 times
	if(_hackFailed == "true") then
	
		triggerAlarm()
	
	end
	
	--When the player succed at hacking the car
	if(_hackSuccess == "true") then
	
		unclockCar()
	
	end
	
	cb()
	
end)


-- END NUI CALLBACKS --------------------------------------------------------------------------



-- TODO ------------------------------------------------------------------------------------
--  [GOOD] Make a [ unclockCar() ] function that will unlock the car when we receive an NUICallback (if the player successfuly hacked)
--	[GOOD] Make a [ triggerAlarm() ] function that will trigger the car alarm when we receive an NUICallback (if the player fail the hacked)
--  [GOOD] Make the [ droptTheHack() ] function


