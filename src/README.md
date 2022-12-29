# BuzzConnect API

## Usage
1. Run the following command from the root of this project. 
```bash
$ mvn spring-boot:run
``` 
This will present a collection of messages on the screen. Ignore these messages and wait until you receive the message: `Started BuzzConnectApplication ...`
2. While this service is running, feel free to invoke any API calls from another instance of the command-line. The following is an example API call:
```bash
$ curl localhost:8080/buzzconnect/event/all
```
If a certain API call requests parameters, you will need to precede each input with a `-d` flag as follows:
```bash
$ curl localhost:8080/buzzconnect/host/login -d username=gburdell2022 -d password=gojackets!
```
## API Reference
**Note**: All of these endpoints are appended from `http:localhost:8080/buzzconnect`.
### Events Reference
| Endpoint  | HTTP Verb | Purpose | 
|--|--|--| 
| `/events/create` | POST | creates an event |
| `/events/all` | GET | gets all active events |
| `/events/viewpoint/:id` | GET | gets all active events from the perspective of a user|
| `/events/info/:eventId` | GET | gets information about an event with the given event ID |
| `/events/remove/:eventId` | DELETE | removes the event with the given event ID |
| `/events/edit/:eventId` | POST | edits an active event with the given attributes |
| `/events/:eventId/rsvp/request` | POST | requests to revise or initialize an RSVP for a given attendee |
| `/events/:eventId/rsvp/remove` | POST | removes an RSVP for a given attendee |
| `/events/:eventId/attendees/all` | GET | gets user data about all attendees currently RSVP'd for a given event |
| `/events/:eventId/attendees/willAttend` | GET | gets user data about all attendees currently RSVP'd as "Will Attend" for a given event |
| `/events/:eventId/attendees/mightAttend ` | GET | gets user data about all attendees currently RSVP'd as "Might Attend" for a given event |
| `/events/:eventId/attendees/willNotAttend` | GET | gets user data about all attendees currently RSVP'd as "Will Not Attend" for a given event |
| `/events/:eventId/invite_only/:status` | POST | resets the Invite-Only status for a given event |
| `/events/:eventId/is_invite_only/` | GET | gets the current Invite-Only status for a given event |
| `/events/:eventId/invite_list/set/:invitees` | POST | sets a list of invited users |


###  Host Reference
| Endpoint URL  | HTTP Verb | Purpose | 
|--|--|--| 
| `/hosts/create` | POST | creates a host | 
| `/hosts/all` | GET | gets all currently registered hosts | 

### Attendee Reference
| Endpoint URL| HTTP Verb | Purpose |
|--|--|--| 
| `/attendees/create` | POST | creates an attendee |
| `/attendees/all` | GET | gets all currently registered attendees |
| `/attendees/:attendeeId/events` | GET | gets information about all events that the given attendee has RSVP'd for |
| `/attendees/:attendeeId` | GET | gets information pertaining to the given attendee |

### Admin Reference
| Endpoint URL| HTTP Verb | Purpose |
|--|--|--| 
| `/admins/create` | POST | creates an attendee administrator |
| `/admins/all` | GET | gets all currently registered administrators |

### Auth Reference
| Endpoint URL| HTTP Verb | Purpose |
|--|--|--| 
| `/auth/login` | POST | verifies that a user with the given credentials exist |

### Location Reference
| Endpoint URL| HTTP Verb | Purpose |
|--|--|--| 
| `/locations/all` | GET | gets all currently registered locations |
| `/locations/info/:locationId` | GET | gets all information about the given location|
| `/locations/create` | POST | creates a location with the given attributes|
| `/locations/:locationId/addEvent` | POST | creates an association between the given location and event |
| `/locations/search` | GET | gets all locations sharing the name provided in the query|

## Contributors 
Brian Pak - [@brianpak2402](https://github.com/brianpak2402) <br/>
Max Zhao <br/>