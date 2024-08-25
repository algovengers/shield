import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import AddContact from "@/components/AddContact";
import { useAuth } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";

type ContactProps = {
  name: string;
  email: string;
  phone: string;
}[];

const max = 5;

const Setup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const {getToken} = useAuth()
  const addNonContact = async()=>{
    const token = getToken()
    await fetchAPI('/api/v1/createNonFavUser',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify({form})
    })
  }


  const [added, setAdded] = useState(0);

  const handleAddContact = () => {
    addNonContact()
    if (added < max) {
      setAdded(added + 1);
    }
  };

  const handleRemoveContact = (index: number) => {
    if (added > 0) {
      setAdded(added - 1);
      const updatedContacts = [...contacts];
      updatedContacts.splice(index, 1);
      setContacts(updatedContacts);
    }
  };

  const [errmsg, setError] = useState("");

  const [contacts, setContacts] = useState<ContactProps>([]);

  function validatePhone(phone: string) {
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (phone.match(phoneRegex)) {
      return true;
    } else {
      setError("Please enter a valid phone number");
      return false;
    }
  }

  return (
    <ScrollView className="bg-[#ffccd5] h-full">
      <View className="relative w-full h-[220px] rounded-b-2xl">
        <Image
          source={images.setup}
          className="w-full h-[220px] z-0 opacity-90 rounded-b-2xl"
        />
      </View>
      <SafeAreaView className="px-4 mb-6">
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-500 font-pmedium w-full text-center">
            Add your emergency contacts {added >= 0 && `(${added}/${max})`}
          </Text>
        </View>

        {added > 0 &&
          //Added Contact info with a delete button at the top
          contacts.map((contact, index) => (
            <View
              key={index}
              className="mt-6 bg-rose-300 py-4 px-6 relative rounded-xl"
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  handleRemoveContact(index);
                }}
              >
                <Image
                  source={icons.dlt}
                  className="w-8 h-8 absolute top-4 right-4"
                />
              </TouchableWithoutFeedback>
              <View className="flex flex-row justify-between items-center mt-2">
                <Text className="text-3xl text-black font-pbold">
                  {contact.name}
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center mt-2">
                <Text className="text-lg text-gray-800 font-pmedium">
                  {contact.phone}
                </Text>
              </View>
              {contact.email && (
                <View className="flex flex-row justify-between items-center mt-2">
                  <Text className="text-base text-gray-700 font-pregular">
                    {contact.email}
                  </Text>
                </View>
              )}
            </View>
          ))}

        {added < max && (
          <AddContact
            value1={form.name}
            value2={form.email}
            value3={form.phone}
            onChangeText1={(text) => setForm({ ...form, name: text })}
            onChangeText2={(text) => setForm({ ...form, email: text })}
            onChangeText3={(text) => setForm({ ...form, phone: text })}
          />
        )}

        {errmsg && (
          <Text className="text-base text-red-500 font-pmedium mt-2">
            {errmsg}
          </Text>
        )}

        {added < max && (
          <CustomButton
            title="Add Contact"
            onPress={() => {
              if (!form.name || !form.phone) {
                setError("Please fill in all fields");
                return;
              }
              // If name, and phone are not empty, add contact
              if (
                form.name &&
                form.phone &&
                validatePhone(form.phone) &&
                added < max
              ) {
                handleAddContact();
                setContacts([...contacts, form]);
                setForm({ name: "", email: "", phone: "" });
                setError("");
              }
            }}
            className="mt-6"
            disabled={added >= max}
          />
        )}

        <CustomButton
          title="Save"
          onPress={() => {
            // Save contacts
            console.log(contacts);
          }}
          className="mt-6 bg-success-400"
          textVariant="primary"
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Setup;
