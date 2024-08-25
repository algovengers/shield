import InputField from "@/components/InputField"
import { images } from "@/constants"
import { fetchAPI } from "@/lib/fetch"
import { useAuth } from "@clerk/clerk-expo"
import { useEffect, useState } from "react"
import { Button, Image, ScrollView, Text, View } from "react-native"

const Contact = ()=>{
    const [keyword,setKeyword] = useState("")
    const [userData,setUserData] = useState<any>([])
    const {getToken } = useAuth()

    async function handleAdd(clerkId: string){
        const token = await getToken()
        const data = await fetchAPI("/api/v1/createFavRequest",{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                clerkId: clerkId
            })
        })
        console.log(data)
    }

    useEffect(()=>{
        async function getData() {
            const token = await getToken()
            const data = await fetchAPI("/api/v1/getUsers?q="+keyword,{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                }
            })
            setUserData(data.data)
            console.log(data)
        }
        getData()
    },[keyword])
    return (
        <ScrollView className="bg-[#ffccd5] h-full">
            <View className="m-7">
            <InputField  placeholder="Enter the username" label="" value={keyword} onChangeText={(text)=>setKeyword(text)} />
            </View>
            <View className=" px-6 py-2 flex flex-col items-center">
                {userData && userData.map((d)=>(
                    <View className="p-2 w-full flex flex-row gap-4 items-center bg-rose-100 rounded-2xl border">
                        <View>
                        <Image
                          source={images.profilebg}
                          className="w-10 h-10 rounded-full"
                          />  
                        <View className="flex flex-col">
                            <Text>{d.name}</Text>
                            <Text>{d.emailId}</Text>
                        </View>
                        <View>
                            <Button title="Add" onPress={()=>{
                                handleAdd(d.clerkId)
                            }}></Button>
                        </View>
                          </View>
                    </View>
                ))
                }
            </View>
        </ScrollView>
    )
}

export default Contact