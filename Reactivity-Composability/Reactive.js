// Reference - https://18alan.space/posts/how-hard-is-it-to-build-a-frontend-framework.html#how-hard-is-it-to-build-a-frontend-framework

// Reactivity - the UI is tied to the data in such a way that just changing the data updates the UI.

// Composibility - the ability to define a component and reuse it without having to redefine it every time we need to use it. 

// Reactivity and composability are the two main things the usual frontend frameworks such as Vue, React, etc give us.


// Reactivity - A simple statement that explains reactivity is when the data updates, update the UI automatically. 


// Proxy Objects: - Proxy allows us to create a proxy object from a regular object:


// Handler that listens to data assignment operations
const handler = {
    set(user, value, property) {
        const query = `[data-mark="${value}"]`;
        const elements = document.querySelectorAll(query);
        for (const element of elements) {
            element.innerText = property;
        }
        console.log(`${property} is being updated`);
        return Reflect.set(user, value, property);
    }
}

const user = {name: 'Lin'};
const proxy = new Proxy(user, handler);

// To update the object to get invoke the listener.
proxy.name = 'Linus';


// Updating the UI automatically:


