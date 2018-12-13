using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;

namespace newMultiuserProjectTracker.Hubs
{
    public class MultiUserHub : Hub
    {
        //public async Task CreateGroup(string name)
        //{
        //    //TODO: put data in database

        //    //await Clients.Caller.SendAsync("NewGroupPage", name);
        //    await Clients.Caller.SendAsync("NewGroupPage", name);
        //}

        //public async Task GetProjectWithGroupName(string groupName)
        //{
        //    //TODO: Retrieve group from database

        //    await Clients.Caller.SendAsync("");
        //}

        //public async Task SendMessage(string user, string message)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", user, message);
        //}

        //public async Task UpdateTextBox(string textboxID, string message)
        //{

        //    await Clients.Others.SendAsync("UpdateText", textboxID, message);
        //}

        //public async Task LockText(string textboxID)
        //{
        //    await Clients.Others.SendAsync("LockTextBox", textboxID);
        //}

        //public async Task UnlockText(string textboxID)
        //{
        //    await Clients.Others.SendAsync("UnlockText", textboxID);
        //}

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task UpdateTextBox(string textboxID, string message)
        {

            await Clients.Others.SendAsync("UpdateText", textboxID, message);
        }

        public async Task LockText(string textboxID)
        {
            await Clients.Others.SendAsync("LockTextBox", textboxID);
        }

        public async Task UnlockText(string textboxID)
        {
            await Clients.Others.SendAsync("UnlockText", textboxID);
        }

        public async Task CreateNewTextBox(string textboxID)
        {
            await Clients.All.SendAsync("CreateNewTextBox", textboxID);
        }
    }
}